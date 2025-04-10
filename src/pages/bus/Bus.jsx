import React from 'react'

import Bus1 from '../../assets/bus1.png';
import Bus2 from '../../assets/bus.png';
import Bus3 from '../../assets/bus5.png';  
import Bus4 from '../../assets/bus4.png';
import Bus5 from '../../assets/bus7.png';
import Bus6 from '../../assets/bus6.png';

import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Bus = () => {
    const buses = [
        {
            id: 1,
            name: "Tourist Bus",
            image: Bus1,
            passengers: 60,
            type: "tourist"
        },
        {
            id: 2,
            name: "Private Bus",
            image: Bus2,
            passengers: 45,
            type: "private"
        },
        {
            id: 3,
            name: "Luxury Bus",
            image: Bus3,
            passengers: 30,
            type: "luxury"
        },
        {
            id: 4,
            name: "Deluxe Bus",
            image: Bus4,
            passengers: 40,
            type: "deluxe"
        },
        {
            id: 5,
            name: "Sleeper Bus",
            image: Bus5,
            passengers: 20,
            type: "sleeper"
        },
        {
            id: 6,
            name: "AC Bus",
            image: Bus6,
            passengers: 35,
            type: "ac"
        }
    ];

    return (
        <div className='w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[8ch] space-y-14'>
            {/* Search and Filter Section */}
            <div className="w-full grid grid-cols-6 gap-14 bg-neutral-200/60 dark:bg-neutral-900/40 rounded-md px-6 py-5 items-center justify-between">
                <div className="flex items-center gap-x-2.5 col-span-2">
                    <input type="text" id='seat' placeholder='Search Buses...' name='seat' className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900" />
                    <button className="bg-violet-600 h-11 px-4 rounded-md text-base text-neutral-50 font-normal">
                        <FaSearch />
                    </button>
                </div>

                <div className="col-span-2"></div>

                <div className="col-span-2">
                    <select className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900">
                        <option value="">Select Bus Type</option>
                        <option value="tourist">Tourist Bus</option>
                        <option value="private">Private Bus</option>
                        <option value="luxury">Luxury Bus</option>
                        <option value="deluxe">Deluxe Bus</option>
                    </select>
                </div>
            </div>

            {/* Buses Cards */}
            <div className="w-full grid grid-cols-3 gap-10">
                {buses.map((bus) => (
                    <Link 
                        key={bus.id} 
                        to={`/bus/${bus.id}`} 
                        className='w-full bg-neutral-200/60 block dark:bg-neutral-900/40 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300'
                    >
                        <img src={bus.image} alt={bus.name} className="w-full aspect-video object-contain object-center" />
                        <div className="px-3 py-4 space-y-2">
                            <div className="flex items-center justify-between">
                                <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                                    {bus.name}
                                </h1>
                                <p className="text-sm font-normal text-neutral-800 dark:text-neutral-50">
                                    {bus.passengers} Passengers
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Bus;