import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWeb3 } from '../../Web3Context';
import { toast } from 'react-hot-toast';
import { ethers } from 'ethers';
import TicketList from '../../components/TicketList';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { wallet, purchaseTicket } = useWeb3();
    const [loading, setLoading] = useState(false);
    const [ethPrice, setEthPrice] = useState(0);
    const [selectedPayment, setSelectedPayment] = useState('crypto');
    const [upiId, setUpiId] = useState('');
    const [cardDetails, setCardDetails] = useState({
        number: '',
        expiry: '',
        cvv: ''
    });

    const { bus, selectedSeats } = location.state || {};

    useEffect(() => {
        if (!bus || !selectedSeats) {
            navigate('/bus');
            return;
        }
        fetchEthPrice();
    }, []);

    const fetchEthPrice = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
            const data = await response.json();
            setEthPrice(data.ethereum.inr);
        } catch (error) {
            console.error('Failed to fetch ETH price:', error);
            toast.error('Failed to fetch current ETH price');
        }
    };

    const handleCryptoPayment = async () => {
        if (!wallet.connected) {
            toast.error('Please connect your wallet first');
            return;
        }

        try {
            setLoading(true);
            const success = await purchaseTicket(selectedSeats, bus.price);
            if (success) {
                toast.success('Payment successful!');
                navigate('/success');
            }
        } catch (error) {
            console.error('Payment failed:', error);
            toast.error('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleUPIPayment = () => {
        if (!upiId) {
            toast.error('Please enter UPI ID');
            return;
        }
        // Here you would integrate with a UPI payment gateway
        toast.success('UPI payment initiated');
        navigate('/success');
    };

    const handleCardPayment = () => {
        if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
            toast.error('Please fill all card details');
            return;
        }
        // Here you would integrate with a card payment gateway
        toast.success('Card payment initiated');
        navigate('/success');
    };

    if (!bus || !selectedSeats) {
        return null;
    }

    const totalEth = bus.price * selectedSeats;
    const totalInr = totalEth * ethPrice;

    return (
        <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[10ch]">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>
                
                {/* Order Summary */}
                <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>Bus Type:</span>
                            <span className="font-medium">{bus.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Number of Seats:</span>
                            <span className="font-medium">{selectedSeats}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Price per Ticket:</span>
                            <span className="font-medium">{bus.price} ETH</span>
                        </div>
                        <div className="border-t pt-4">
                            <div className="flex justify-between font-bold">
                                <span>Total in ETH:</span>
                                <span>{totalEth.toFixed(3)} ETH</span>
                            </div>
                            <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                                <span>Total in INR:</span>
                                <span>₹{totalInr.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Options */}
                <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Payment Options</h2>
                    
                    <div className="space-y-4">
                        {/* Payment Method Selection */}
                        <div className="flex space-x-4 mb-6">
                            <button
                                onClick={() => setSelectedPayment('crypto')}
                                className={`flex-1 py-2 px-4 rounded-md ${
                                    selectedPayment === 'crypto'
                                        ? 'bg-violet-600 text-white'
                                        : 'bg-neutral-100 dark:bg-neutral-700'
                                }`}
                            >
                                Crypto (ETH)
                            </button>
                            <button
                                onClick={() => setSelectedPayment('upi')}
                                className={`flex-1 py-2 px-4 rounded-md ${
                                    selectedPayment === 'upi'
                                        ? 'bg-violet-600 text-white'
                                        : 'bg-neutral-100 dark:bg-neutral-700'
                                }`}
                            >
                                UPI
                            </button>
                            <button
                                onClick={() => setSelectedPayment('card')}
                                className={`flex-1 py-2 px-4 rounded-md ${
                                    selectedPayment === 'card'
                                        ? 'bg-violet-600 text-white'
                                        : 'bg-neutral-100 dark:bg-neutral-700'
                                }`}
                            >
                                Card
                            </button>
                        </div>

                        {/* Crypto Payment */}
                        {selectedPayment === 'crypto' && (
                            <div className="space-y-4">
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Pay with your connected wallet
                                </p>
                                <button
                                    onClick={handleCryptoPayment}
                                    disabled={loading}
                                    className={`w-full py-3 px-6 rounded-md text-white font-medium ${
                                        loading
                                            ? 'bg-neutral-400 cursor-not-allowed'
                                            : 'bg-violet-600 hover:bg-violet-700'
                                    } transition-colors`}
                                >
                                    {loading ? 'Processing...' : 'Pay with ETH'}
                                </button>
                            </div>
                        )}

                        {/* UPI Payment */}
                        {selectedPayment === 'upi' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">UPI ID</label>
                                    <input
                                        type="text"
                                        value={upiId}
                                        onChange={(e) => setUpiId(e.target.value)}
                                        placeholder="your.upi@bank"
                                        className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                    />
                                </div>
                                <button
                                    onClick={handleUPIPayment}
                                    className="w-full py-3 px-6 rounded-md bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors"
                                >
                                    Pay with UPI
                                </button>
                            </div>
                        )}

                        {/* Card Payment */}
                        {selectedPayment === 'card' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Card Number</label>
                                    <input
                                        type="text"
                                        value={cardDetails.number}
                                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                        placeholder="1234 5678 9012 3456"
                                        className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
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
                                            className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">CVV</label>
                                        <input
                                            type="text"
                                            value={cardDetails.cvv}
                                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                            placeholder="123"
                                            className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={handleCardPayment}
                                    className="w-full py-3 px-6 rounded-md bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors"
                                >
                                    Pay with Card
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Your Tickets</h2>
                <TicketList />
            </div>
        </div>
    );
};

export default Checkout;