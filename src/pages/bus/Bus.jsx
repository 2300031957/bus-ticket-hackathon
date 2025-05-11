import React from 'react'

import Bus1 from '../../assets/bus1.png';
import Bus2 from '../../assets/bus.png';
import Bus3 from '../../assets/bus5.png';  
import Bus4 from '../../assets/bus4.png';
import Bus5 from '../../assets/bus7.png';
import Bus6 from '../../assets/bus6.png';

import { Link } from 'react-router-dom';
import { FaSearch, FaStar } from 'react-icons/fa';

const buses = [
    {
        id: 1,
        name: "Tourist Bus",
        image: Bus1,
        passengers: 60,
        type: "tourist",
        rating: 4.5,
        plateNumber: "AP9R2001",
        brand: "VOLVO",
        price: 0.01 // Price in ETH
    },
    {
        id: 2,
        name: "Private Bus",
        image: Bus2,
        passengers: 45,
        type: "private",
        rating: 4.2,
        plateNumber: "AP9R2002",
        brand: "MERCEDES",
        price: 0.015
    },
    {
        id: 3,
        name: "Luxury Bus",
        image: Bus3,
        passengers: 30,
        type: "luxury",
        rating: 4.8,
        plateNumber: "AP9R2003",
        brand: "SCANIA",
        price: 0.02
    },
    {
        id: 4,
        name: "Deluxe Bus",
        image: Bus4,
        passengers: 40,
        type: "deluxe",
        rating: 4.3,
        plateNumber: "AP9R2004",
        brand: "VOLVO",
        price: 0.012
    },
    {
        id: 5,
        name: "Sleeper Bus",
        image: Bus5,
        passengers: 20,
        type: "sleeper",
        rating: 4.6,
        plateNumber: "AP9R2005",
        brand: "MERCEDES",
        price: 0.018
    },
    {
        id: 6,
        name: "AC Bus",
        image: Bus6,
        passengers: 35,
        type: "ac",
        rating: 4.4,
        plateNumber: "AP9R2006",
        brand: "VOLVO",
        price: 0.014
    }
];

const Bus = () => {
    return (
        <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[10ch]">
            <h1 className="text-3xl font-bold mb-8">Available Buses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {buses.map((bus) => (
                    <Link
                        key={bus.id}
                        to={`/bus/${bus.id}`}
                        className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <img
                            src={bus.image}
                            alt={bus.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-semibold">{bus.name}</h2>
                                <div className="flex items-center">
                                    <FaStar className="text-yellow-400 mr-1" />
                                    <span>{bus.rating}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Type</p>
                                    <p className="font-medium">{bus.type}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Capacity</p>
                                    <p className="font-medium">{bus.passengers} seats</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-neutral-600 dark:text-neutral-400">Price per ticket</span>
                                <span className="font-bold">{bus.price} ETH</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Bus;