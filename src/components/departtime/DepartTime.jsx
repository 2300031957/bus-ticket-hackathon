import React, { useState } from 'react';
import { Clock } from 'lucide-react'; // Using Lucide React Icons
import { motion, AnimatePresence } from 'framer-motion'; // For smooth transitions

const DepartTime = () => {
    const [departBus, setDepartBus] = useState('');

    const handleDepartBusChange = (e) => {
        setDepartBus(e.target.value);
    };

    const handleReset = () => {
        setDepartBus('');
    };

    return (
        <div className='w-full space-y-4'>
            {!departBus ? (
                <div className='w-full grid grid-cols-2 gap-6'>
                    <div>
                        <label htmlFor="departbus" className="block mb-2 font-semibold flex items-center gap-2">
                            <Clock size={18} /> Departure Time
                        </label>
                        <select
                            name="departbus"
                            value={departBus}
                            onChange={handleDepartBusChange}
                            id="departbus"
                            className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900 transition-all duration-300"
                        >
                            <option value="">Select Time</option>
                            <option value="04:00 AM">04:00 AM</option>
                            <option value="06:00 AM">06:00 AM</option>
                            <option value="08:00 AM">08:00 AM</option>
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
                            <Clock size={20} /> Your Selected Departure Time
                        </h1>
                        <div className="flex-1 border-dashed border-b border-neutral-400 dark:border-neutral-600"></div>
                        <div className="text-base font-semibold">
                            Bus Departure Time: <span className="font-medium">{departBus}</span>
                        </div>

                        {/* Reset Button */}
                        <button 
                            onClick={handleReset} 
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-all duration-300"
                        >
                            Change Time
                        </button>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
};

export default DepartTime;
