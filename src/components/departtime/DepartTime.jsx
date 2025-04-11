import React from 'react';
import { Clock } from 'lucide-react'; // Using Lucide React Icons
import { motion, AnimatePresence } from 'framer-motion'; // For smooth transitions

const DepartTime = ({ departureTime, setDepartureTime }) => {
    const times = [
        "06:00 AM",
        "08:00 AM",
        "10:00 AM",
        "12:00 PM",
        "02:00 PM",
        "04:00 PM",
        "06:00 PM",
        "08:00 PM",
        "10:00 PM"
    ];

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select Departure Time</h2>
            <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <select
                    value={departureTime}
                    onChange={(e) => {
                        console.log('Departure time selected:', e.target.value);
                        setDepartureTime(e.target.value);
                    }}
                    className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                    <option value="">Select Time</option>
                    {times.map((time) => (
                        <option key={time} value={time}>
                            {time}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DepartTime;
