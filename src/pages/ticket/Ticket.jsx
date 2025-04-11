import React from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';

const Ticket = () => {
    // Get tickets from localStorage
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');

    return (
        <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[10ch]">
            <h1 className="text-3xl font-bold mb-8">My Tickets</h1>
            
            {tickets.length === 0 ? (
                <div className="text-center py-12">
                    <FaTicketAlt className="mx-auto text-6xl text-neutral-400 mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">No Tickets Found</h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                        You haven't booked any tickets yet.
                    </p>
                    <Link
                        to="/bus"
                        className="px-6 py-3 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors"
                    >
                        Book a Ticket
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tickets.map((ticket, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <FaBus className="text-violet-600 mr-2" />
                                    <h2 className="text-xl font-semibold">Ticket #{ticket.id}</h2>
                                </div>
                                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {new Date(ticket.timestamp).toLocaleDateString()}
                                </span>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="text-neutral-400 mr-2" />
                                    <div>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Route</p>
                                        <p className="font-medium">
                                            {ticket.fromCity} → {ticket.toCity}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <FaCalendarAlt className="text-neutral-400 mr-2" />
                                    <div>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Departure Time</p>
                                        <p className="font-medium">{ticket.departureTime}</p>
                                    </div>
                                </div>
                                
                                <div>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Seats</p>
                                    <p className="font-medium">
                                        {Array.isArray(ticket.seats) ? ticket.seats.join(', ') : ticket.seats}
                                    </p>
                                </div>
                                
                                <div className="flex justify-between items-center pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Total Price</span>
                                    <span className="font-bold">{ticket.totalPrice} ETH</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Ticket; 