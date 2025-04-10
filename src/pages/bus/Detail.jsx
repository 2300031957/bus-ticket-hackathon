import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Destination from '../../components/destination/Destination';
import DepartTime from '../../components/departtime/DepartTime';
import Seat from '../../components/seat/Seat';

// Import all bus images
import Bus1 from '../../assets/bus1.png';
import Bus2 from '../../assets/bus.png';
import Bus3 from '../../assets/bus5.png';
import Bus4 from '../../assets/bus4.png';
import Bus5 from '../../assets/bus7.png';
import Bus6 from '../../assets/bus6.png';

const buses = [
    {
        id: 1,
        name: "Tourist Bus",
        image: Bus1,
        passengers: 60,
        type: "tourist",
        rating: 4.5,
        plateNumber: "AP9R2001",
        brand: "VOLVO"
    },
    {
        id: 2,
        name: "Private Bus",
        image: Bus2,
        passengers: 45,
        type: "private",
        rating: 4.2,
        plateNumber: "AP9R2002",
        brand: "MERCEDES"
    },
    {
        id: 3,
        name: "Luxury Bus",
        image: Bus3,
        passengers: 30,
        type: "luxury",
        rating: 4.8,
        plateNumber: "AP9R2003",
        brand: "SCANIA"
    },
    {
        id: 4,
        name: "Deluxe Bus",
        image: Bus4,
        passengers: 40,
        type: "deluxe",
        rating: 4.3,
        plateNumber: "AP9R2004",
        brand: "VOLVO"
    },
    {
        id: 5,
        name: "Sleeper Bus",
        image: Bus5,
        passengers: 20,
        type: "sleeper",
        rating: 4.6,
        plateNumber: "AP9R2005",
        brand: "MERCEDES"
    },
    {
        id: 6,
        name: "AC Bus",
        image: Bus6,
        passengers: 35,
        type: "ac",
        rating: 4.4,
        plateNumber: "AP9R2006",
        brand: "VOLVO"
    }
];

const Detail = () => {
    const { id } = useParams();
    const bus = buses.find(b => b.id === parseInt(id));

    if (!bus) {
        return (
            <div className='w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[10ch] text-center'>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Bus not found</h1>
                <Link to="/bus" className="text-blue-600 hover:text-blue-800">Back to Buses</Link>
            </div>
        );
    }

    return (
        <div className='w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[10ch]'>
            <div className="w-full grid grid-cols-2 gap-16 items-center">
                <div className="col-span-1 space-y-8">
                    <img src={bus.image} alt={`${bus.name} Image`} className="w-full aspect-[3/2] rounded-md object-contain"/>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">
                            {bus.name}
                            <span className="text-base font-normal text-neutral-400 dark:text-neutral-500 ml-3">
                                ({bus.plateNumber})
                            </span>
                        </h1>

                        <div className="flex items-center gap-x-2">
                            <div className="flex items-center gap-x-1 text-sm text-yellow-500 dark:text-yellow-600">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                            <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
                                ({bus.rating})
                            </p>
                        </div>

                        <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
                            {bus.brand} -- {bus.plateNumber}
                        </p>

                        <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
                            Capacity: {bus.passengers} passengers
                        </p>
                    </div>
                </div>

                <div className="col-span-1 space-y-10">
                    <div className="space-y-6">
                        <Destination />
                        <DepartTime />
                        <Seat />
                    </div>

                    <Link 
                        to="/checkout" 
                        className="w-full bg-violet-600 text-neutral-50 text-center py-3 rounded-md block hover:bg-violet-700 transition-colors duration-300"
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Detail;