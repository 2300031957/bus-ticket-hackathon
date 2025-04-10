import React, { useState } from 'react';
import { MapPin } from 'lucide-react'; // Importing Lucide Icons
import { motion, AnimatePresence } from 'framer-motion'; // Importing Framer Motion for animation

const Destination = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const handleFromChange = (e) => {
        setFrom(e.target.value);
    };

    const handleToChange = (e) => {
        setTo(e.target.value);
    };

    const handleReset = () => {
        setFrom('');
        setTo('');
    };

    const isDestinationSelected = from && to;

    return (
        <div className='w-full space-y-4'>
            {!isDestinationSelected ? (
                <div className='w-full grid grid-cols-2 gap-6'>
                    {/* From Location */}
                    <div>
                        <label htmlFor="from" className="block mb-2 font-semibold flex items-center gap-2">
                            <MapPin size={18} /> From
                        </label>
                        <select
                            name="from"
                            value={from}
                            onChange={handleFromChange}
                            id="from"
                            className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900 transition-all duration-300"
                        >
                            <option value="">Select Location</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Vijayawada">Vijayawada</option>
                            <option value="Chandigarh">Chandigarh</option>
                        </select>
                    </div>

                    {/* To Location */}
                    <div>
                        <label htmlFor="to" className="block mb-2 font-semibold flex items-center gap-2">
                            <MapPin size={18} /> To
                        </label>
                        <select
                            name="to"
                            value={to}
                            onChange={handleToChange}
                            id="to"
                            className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900 transition-all duration-300"
                        >
                            <option value="">Select Destination</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Vijayawada">Vijayawada</option>
                            <option value="Chandigarh">Chandigarh</option>
                        </select>
                    </div>
                </div>
            ) : (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className='space-y-5 p-4 border rounded-md bg-neutral-100 dark:bg-neutral-800 shadow-md'
                    >
                        <h1 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
                            <MapPin size={20} /> Your Selected Destination
                        </h1>
                        <div className="flex items-center gap-x-5">
                            {/* From Destination */}
                            <div className="text-base font-semibold">
                                From: <span className="font-medium">{from}</span>
                            </div>

                            {/* Dashed Line */}
                            <div className="flex-1 border-dashed border-b border-neutral-400 dark:border-neutral-600"></div>

                            {/* To Destination */}
                            <div className="text-base font-semibold">
                                To: <span className="font-medium">{to}</span>
                            </div>
                        </div>

                        {/* Reset Button */}
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-all duration-300"
                        >
                            Change Destination
                        </button>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
};

export default Destination;