import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ethers } from 'ethers';
import TicketList from '../../components/TicketList';
import { useWeb3 } from '../../Web3Context';
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
    const { account, signer, isConnected, connectWallet, sendTransaction, balance, loading: walletLoading } = useWeb3();
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

    useEffect(() => {
        if (!bus || !selectedSeats || !fromCity || !toCity || !departureTime) {
            navigate('/bus');
        }
    }, [bus, selectedSeats, fromCity, toCity, departureTime, navigate]);

    const handlePayment = async () => {
        if (!selectedSeats || selectedSeats.length === 0) {
            toast.error('Please select at least one seat');
            return;
        }

        setLoading(true);
        try {
            if (paymentMethod === 'ethereum') {
                if (!isConnected) {
                    await connectWallet();
                }
                if (!isConnected) {
                    throw new Error('Please connect your wallet to proceed');
                }

                // Send ETH payment
                const totalAmount = bus.price * selectedSeats.length;
                const tx = await sendTransaction(bus.operatorAddress, totalAmount.toString());
                await tx.wait();

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
            } else if (paymentMethod === 'upi') {
                if (!upiId) {
                    toast.error('Please enter UPI ID');
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
                // Simulate card payment
                await new Promise(resolve => setTimeout(resolve, 2000));
                toast.success('Card Payment successful!');
                navigate('/tickets');
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error(error.message);
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
            toast.success('UPI ID validated successfully');
        } catch (error) {
            setUpiValidation({
                isValid: false,
                accountHolderName: '',
                loading: false
            });
            toast.error(error.message);
        }
    };

    if (!bus || !selectedSeats) {
        return null;
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
                        <span>₹{selectedSeats.length * bus.price}</span>
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
                        {walletLoading ? (
                            <div className="flex items-center justify-center p-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                        ) : isConnected ? (
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                    <span className="text-green-500 font-semibold">Connected</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Address:</span>
                                    <span className="font-mono text-sm">
                                        {account.slice(0, 6)}...{account.slice(-4)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Balance:</span>
                                    <span className="font-semibold">{balance} ETH</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <p className="text-gray-600 dark:text-gray-400 mb-4">Wallet not connected</p>
                                <button
                                    onClick={connectWallet}
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
                                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
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
                                placeholder="Prabhsirat Kaur"
                                className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Expiry Date</label>
                                <input
                                    type="text"
                                    value={cardDetails.expiry}
                                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
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
                                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
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
                    disabled={loading || (paymentMethod === 'ethereum' && !isConnected)}
                    className={`w-full bg-blue-500 text-white py-3 rounded-lg ${
                        (loading || (paymentMethod === 'ethereum' && !isConnected))
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-blue-600 transition-colors'
                    }`}
                >
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </div>
        </div>
    );
};

export default Checkout;