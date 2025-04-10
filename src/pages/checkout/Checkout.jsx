import React, { useContext, useState } from 'react';
import { Web3Context } from '../../Web3Context';
import TicketList from '../../components/TicketList';

const Checkout = () => {
    const { wallet, connectWallet, purchaseTicket, loading, error, network } = useContext(Web3Context);
    const [numberOfTickets, setNumberOfTickets] = useState(1);
    const ticketPrice = 0.01; // Price in ETH
    const [showTickets, setShowTickets] = useState(false);
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePayment = async () => {
        if (!wallet.connected) {
            await connectWallet();
            return;
        }

        try {
            const success = await purchaseTicket(numberOfTickets, ticketPrice);
            if (success) {
                setShowTickets(true);
            }
        } catch (err) {
            console.error('Payment failed:', err);
        }
    };

    return (
        <div className='w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[8ch] space-y-10'>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            
            <div className="grid grid-cols-5 gap-16 items-start">
                <div className="col-span-3 space-y-7 pr-20">
                    <h2 className="text-x1 text-neutral-800 dark:text-neutral-100 font-medium">
                        Passenger Information
                    </h2>
                    <form className="space-y-6">
                        <div className="">
                            <label htmlFor="fullname" className="block mb-2 font-semibold">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id='fullname'
                                name='fullname'
                                value={formData.fullname}
                                onChange={handleInputChange}
                                placeholder='e.g. Pothana Likith Prabhu'
                                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
                            />
                        </div>
                        <div className="">
                            <label htmlFor="email" className="block mb-2 font-semibold">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder='e.g. 2300031957@kluniversity.in'
                                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
                            />
                            <small className="block mt-1 text-xs text-neutral-500 dark:text-neutral-600 font-normal">
                                You will receive your ticket on this email address
                            </small>
                        </div>
                        <div className="">
                            <label htmlFor="phone" className="block mb-2 font-semibold">
                                Mobile
                            </label>
                            <input
                                type="tel"
                                id='phone'
                                name='phone'
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder='e.g. +91 7416131851'
                                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-span-2 space-y-7">
                    <h2 className="text-x1 text-neutral-800 dark:text-neutral-100 font-medium">
                        Payment Information
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>Number of Tickets:</span>
                            <input
                                type="number"
                                min="1"
                                value={numberOfTickets}
                                onChange={(e) => setNumberOfTickets(parseInt(e.target.value))}
                                className="w-20 px-2 py-1 border rounded"
                            />
                        </div>
                        <div className="flex justify-between">
                            <span>Price per Ticket:</span>
                            <span>{ticketPrice} ETH</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span>{(ticketPrice * numberOfTickets).toFixed(2)} ETH</span>
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? 'Processing...' : wallet.connected ? 'Pay with MetaMask' : 'Connect Wallet'}
                    </button>
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