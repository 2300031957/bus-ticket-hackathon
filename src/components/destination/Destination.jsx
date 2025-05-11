import React from 'react';
import { MapPin } from 'lucide-react'; // Importing Lucide Icons
import { motion, AnimatePresence } from 'framer-motion'; // Importing Framer Motion for animation

const Destination = ({ fromCity, toCity, setFromCity, setToCity }) => {
    const cities = [
        "Hyderabad",
        "Bangalore",
        "Chennai",
        "Mumbai",
        "Delhi",
        "Kolkata",
        "Pune",
        "Ahmedabad"
    ];

    const handleReset = () => {
        setFromCity('');
        setToCity('');
    };

    const isDestinationSelected = fromCity && toCity;

    return (
        <div className='w-full space-y-4'>
            {!isDestinationSelected ? (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Select Route</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">From</label>
                            <select
                                value={fromCity}
                                onChange={(e) => {
                                    console.log('From city selected:', e.target.value);
                                    setFromCity(e.target.value);
                                }}
                                className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            >
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">To</label>
                            <select
                                value={toCity}
                                onChange={(e) => {
                                    console.log('To city selected:', e.target.value);
                                    setToCity(e.target.value);
                                }}
                                className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            >
                                <option value="">Select City</option>
                                {cities
                                    .filter((city) => city !== fromCity)
                                    .map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                            </select>
                        </div>
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
                                From: <span className="font-medium">{fromCity}</span>
                            </div>

                            {/* Dashed Line */}
                            <div className="flex-1 border-dashed border-b border-neutral-400 dark:border-neutral-600"></div>

                            {/* To Destination */}
                            <div className="text-base font-semibold">
                                To: <span className="font-medium">{toCity}</span>
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