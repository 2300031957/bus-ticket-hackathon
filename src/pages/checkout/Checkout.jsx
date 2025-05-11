import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ethers } from 'ethers';
import TicketList from '../../components/TicketList';
import { useWeb3 } from '../../context/Web3Context';
import { ticketService } from '../../services/ticketService';
import { upiService } from '../../services/upiService';
import { FaEthereum, FaCreditCard } from 'react-icons/fa';
import { SiPhonepe, SiGooglepay, SiPaytm } from 'react-icons/si';
import { BsCashCoin } from 'react-icons/bs';

// Contract ABI and address
const CONTRACT_ABI = [
    "function purchaseTicket(uint256[] memory seatNumbers, uint256 price) public payable",
    "function getTicketPrice() public view returns (uint256)",
    "function getAvailableSeats() public view returns (uint256[] memory)",
    "function getTicketDetails(uint256 ticketId) public view returns (address, uint256, uint256[] memory, uint256)",
    "function getContractBalance() public view returns (uint256)"
];

// Network configurations
const NETWORKS = {
    11155111: {
        name: "Sepolia Testnet",
        contractAddress: "0x1234567890123456789012345678901234567890" // Replace with your contract address
    }
};

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bus, selectedSeats, fromCity, toCity, departureTime } = location.state || {};
    const { provider, signer, account, isConnected, connectWallet, balance } = useWeb3();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [upiId, setUpiId] = useState('');
    const [upiValidation, setUpiValidation] = useState({
        isValid: false,
        accountHolderName: '',
        loading: false
    });
    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });

    // Debug logging
    useEffect(() => {
        console.log('Checkout component mounted with state:', {
            bus,
            selectedSeats,
            fromCity,
            toCity,
            departureTime,
            web3State: {
                isConnected,
                account,
                balance,
                provider: !!provider,
                signer: !!signer
            }
        });
    }, [bus, selectedSeats, fromCity, toCity, departureTime, isConnected, account, balance, provider, signer]);

    // Validate required data
    useEffect(() => {
        if (!location.state) {
            console.error('No state data found in location');
            toast.error('Missing booking information');
            navigate('/bus');
            return;
        }

        if (!bus || !selectedSeats || !fromCity || !toCity || !departureTime) {
            console.error('Missing required data:', { bus, selectedSeats, fromCity, toCity, departureTime });
            toast.error('Missing required booking information');
            navigate('/bus');
            return;
        }

        // Validate bus data
        if (!bus.id || !bus.price || !bus.name) {
            console.error('Invalid bus data:', bus);
            toast.error('Invalid bus information');
            navigate('/bus');
            return;
        }

        // Validate selected seats
        if (!Array.isArray(selectedSeats) || selectedSeats.length === 0) {
            console.error('Invalid selected seats:', selectedSeats);
            toast.error('Please select at least one seat');
            navigate('/bus');
            return;
        }
    }, [location.state, navigate, bus, selectedSeats, fromCity, toCity, departureTime]);

    const handlePayment = async () => {
        if (!selectedSeats || selectedSeats.length === 0) {
            toast.error('Please select at least one seat');
            return;
        }

        setLoading(true);
        try {
            if (paymentMethod === 'ethereum') {
                // Check if MetaMask is installed
                if (!window.ethereum) {
                    throw new Error('Please install MetaMask to use Ethereum payments');
                }

                // Connect wallet if not connected
                if (!isConnected) {
                    try {
                        await connectWallet();
                        // Wait a bit for the connection to be established
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    } catch (error) {
                        console.error('Wallet connection error:', error);
                        throw new Error('Failed to connect wallet. Please try again.');
                    }
                }

                // Double check connection status
                if (!isConnected || !account) {
                    throw new Error('Please connect your wallet to proceed');
                }

                // Check if we have enough balance
                const totalAmount = bus.price * selectedSeats.length;
                const balanceInEth = parseFloat(balance || '0');
                if (balanceInEth < totalAmount) {
                    throw new Error(`Insufficient balance. You need ${totalAmount} ETH but have ${balanceInEth} ETH`);
                }

                try {
                    // Send ETH payment
                    const tx = await signer.sendTransaction({
                        to: bus.operatorAddress,
                        value: ethers.parseEther(totalAmount.toString())
                    });

                    // Show transaction hash
                    toast.success(`Transaction sent! Hash: ${tx.hash.slice(0, 6)}...${tx.hash.slice(-4)}`);

                    // Wait for transaction confirmation
                    const receipt = await tx.wait();
                    console.log('Transaction confirmed:', receipt);

                    // Mint tickets
                    const mintPromises = selectedSeats.map(seatNumber =>
                        ticketService.mintTicket(
                            signer,
                            bus.id,
                            seatNumber,
                            bus.price,
                            new Date(departureTime).getTime() / 1000,
                            fromCity,
                            toCity
                        )
                    );

                    const mintResults = await Promise.all(mintPromises);
                    const newTicketIds = mintResults.map(tx => tx.hash);

                    toast.success('Payment successful and tickets minted!');
                    navigate('/tickets', { state: { ticketIds: newTicketIds } });
                } catch (error) {
                    console.error('Transaction error:', error);
                    if (error.code === 'INSUFFICIENT_FUNDS') {
                        throw new Error('Insufficient funds for gas * price + value');
                    } else if (error.code === 'USER_REJECTED') {
                        throw new Error('Transaction was rejected by user');
                    } else {
                        throw new Error(`Transaction failed: ${error.message}`);
                    }
                }
            } else if (paymentMethod === 'upi') {
                if (!upiId) {
                    toast.error('Please enter UPI ID');
                    return;
                }
                if (!upiValidation.isValid) {
                    toast.error('Please enter a valid UPI ID');
                    return;
                }
                // Simulate UPI payment
                await new Promise(resolve => setTimeout(resolve, 2000));
                toast.success('UPI Payment successful!');
                navigate('/tickets');
            } else if (paymentMethod === 'card') {
                if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
                    toast.error('Please fill all card details');
                    return;
                }
                // Validate card number (basic check)
                if (!/^\d{16}$/.test(cardDetails.number.replace(/\s/g, ''))) {
                    toast.error('Please enter a valid card number');
                    return;
                }
                // Validate expiry date (MM/YY format)
                if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
                    toast.error('Please enter a valid expiry date (MM/YY)');
                    return;
                }
                // Validate CVV (3 digits)
                if (!/^\d{3}$/.test(cardDetails.cvv)) {
                    toast.error('Please enter a valid CVV');
                    return;
                }
                // Simulate card payment
                await new Promise(resolve => setTimeout(resolve, 2000));
                toast.success('Card Payment successful!');
                navigate('/tickets');
            } else {
                toast.error('Please select a payment method');
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error(error.message || 'Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const validateUPI = async (upiId) => {
        if (!upiId) {
            setUpiValidation({ isValid: false, accountHolderName: '', loading: false });
            return;
        }

        setUpiValidation(prev => ({ ...prev, loading: true }));
        try {
            const result = await upiService.validateUPI(upiId);
            setUpiValidation({
                isValid: result.isValid,
                accountHolderName: result.accountHolderName,
                loading: false
            });
            if (result.isValid) {
                toast.success('UPI ID validated successfully');
            }
        } catch (error) {
            setUpiValidation({
                isValid: false,
                accountHolderName: '',
                loading: false
            });
            toast.error(error.message || 'Invalid UPI ID');
        }
    };

    if (!location.state) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Error</h2>
                    <p className="text-red-500">No booking information found. Please try booking again.</p>
                    <button
                        onClick={() => navigate('/bus')}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Return to Bus Selection
                    </button>
                </div>
            </div>
        );
    }

    if (!bus || !selectedSeats) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Error</h2>
                    <p className="text-red-500">Missing booking information. Please try booking again.</p>
                    <button
                        onClick={() => navigate('/bus')}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Return to Bus Selection
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span>Bus:</span>
                        <span>{bus.name}</span>
                    </div>
                    
                    <div className="flex justify-between">
                        <span>Route:</span>
                        <span>{fromCity} to {toCity}</span>
                    </div>
                    
                    <div className="flex justify-between">
                        <span>Departure Time:</span>
                        <span>{new Date(departureTime).toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                        <span>Selected Seats:</span>
                        <span>{selectedSeats.join(', ')}</span>
                    </div>
                    
                    <div className="flex justify-between font-bold">
                        <span>Total Price:</span>
                        <span>{(selectedSeats.length * bus.price).toFixed(4)} ETH</span>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <button
                        onClick={() => setPaymentMethod('ethereum')}
                        className={`flex items-center justify-center p-4 rounded-lg border-2 ${
                            paymentMethod === 'ethereum'
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-300 dark:border-neutral-700'
                        }`}
                    >
                        <FaEthereum className="text-2xl mr-2" />
                        <span>Ethereum</span>
                    </button>
                    
                    <button
                        onClick={() => setPaymentMethod('upi')}
                        className={`flex items-center justify-center p-4 rounded-lg border-2 ${
                            paymentMethod === 'upi'
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-300 dark:border-neutral-700'
                        }`}
                    >
                        <div className="flex space-x-2">
                            <SiPhonepe className="text-2xl" />
                            <SiGooglepay className="text-2xl" />
                            <SiPaytm className="text-2xl" />
                        </div>
                        <span className="ml-2">UPI</span>
                    </button>
                    
                    <button
                        onClick={() => setPaymentMethod('card')}
                        className={`flex items-center justify-center p-4 rounded-lg border-2 ${
                            paymentMethod === 'card'
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-300 dark:border-neutral-700'
                        }`}
                    >
                        <FaCreditCard className="text-2xl mr-2" />
                        <span>Card</span>
                    </button>
                </div>

                {paymentMethod === 'ethereum' && (
                    <div className="bg-gray-50 dark:bg-neutral-900 p-4 rounded-lg mb-6">
                        <h3 className="text-lg font-semibold mb-4">Wallet Status</h3>
                        {isConnected && typeof account === 'string' && account.length > 0 ? (
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                    <span className="text-green-500 font-semibold">Connected</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Address:</span>
                                    <span className="font-mono text-sm">
                                        {account && account.length >= 10 ? 
                                            `${account.slice(0, 6)}...${account.slice(-4)}` : 
                                            'Invalid address'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Balance:</span>
                                    <span className="font-semibold">{balance || '0'} ETH</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Required Amount:</span>
                                    <span className="font-semibold">{(selectedSeats.length * bus.price).toFixed(4)} ETH</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <p className="text-gray-600 dark:text-gray-400 mb-4">Wallet not connected</p>
                                <button
                                    onClick={async () => {
                                        try {
                                            await connectWallet();
                                            toast.success('Wallet connected successfully!');
                                        } catch (error) {
                                            console.error('Wallet connection error:', error);
                                            toast.error('Failed to connect wallet. Please try again.');
                                        }
                                    }}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Connect Wallet
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {paymentMethod === 'upi' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">UPI ID</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={upiId}
                                    onChange={(e) => {
                                        setUpiId(e.target.value);
                                        validateUPI(e.target.value);
                                    }}
                                    placeholder="username@upi"
                                    className="flex-1 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {upiValidation.loading && (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                    </div>
                                )}
                            </div>
                            {upiValidation.isValid && upiValidation.accountHolderName && (
                                <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                                    Account Holder: {upiValidation.accountHolderName}
                                </div>
                            )}
                        </div>
                        <div className="flex gap-4 justify-center">
                            <SiPhonepe className="text-3xl text-purple-600" />
                            <SiGooglepay className="text-3xl text-blue-600" />
                            <SiPaytm className="text-3xl text-blue-500" />
                        </div>
                    </div>
                )}

                {paymentMethod === 'card' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Card Number</label>
                            <input
                                type="text"
                                value={cardDetails.number}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                                    setCardDetails({ ...cardDetails, number: value });
                                }}
                                placeholder="1234 5678 9012 3456"
                                maxLength="16"
                                className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                            <input
                                type="text"
                                value={cardDetails.name}
                                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                placeholder="John Doe"
                                className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Expiry Date</label>
                                <input
                                    type="text"
                                    value={cardDetails.expiry}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                                        if (value.length > 2) {
                                            setCardDetails({ ...cardDetails, expiry: `${value.slice(0, 2)}/${value.slice(2)}` });
                                        } else {
                                            setCardDetails({ ...cardDetails, expiry: value });
                                        }
                                    }}
                                    placeholder="MM/YY"
                                    maxLength="5"
                                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">CVV</label>
                                <input
                                    type="password"
                                    value={cardDetails.cvv}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                                        setCardDetails({ ...cardDetails, cvv: value });
                                    }}
                                    placeholder="123"
                                    maxLength="3"
                                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <button
                    onClick={handlePayment}
                    disabled={loading || (paymentMethod === 'ethereum' && !isConnected) || !paymentMethod}
                    className={`w-full mt-6 bg-blue-500 text-white py-3 rounded-lg ${
                        (loading || (paymentMethod === 'ethereum' && !isConnected) || !paymentMethod)
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-blue-600 transition-colors'
                    }`}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Processing...
                        </div>
                    ) : (
                        'Pay Now'
                    )}
                </button>
            </div>
        </div>
    );
};

export default Checkout;