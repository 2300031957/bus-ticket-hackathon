import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Destination from '../../components/destination/Destination';
import DepartTime from '../../components/departtime/DepartTime';
import BusSeatLayout from '../../components/seat/Seat';
import { toast } from 'react-hot-toast';

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

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bus, setBus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [departureTime, setDepartureTime] = useState('');

    useEffect(() => {
        const fetchBus = () => {
            setLoading(true);
            const foundBus = buses.find(b => b.id === parseInt(id));
            if (foundBus) {
                setBus(foundBus);
            }
            setLoading(false);
        };

        fetchBus();
    }, [id]);

    const handleFromCityChange = (city) => {
        console.log('Setting from city:', city);
        setFromCity(city);
    };

    const handleToCityChange = (city) => {
        console.log('Setting to city:', city);
        setToCity(city);
    };

    const handleDepartureTimeChange = (time) => {
        console.log('Setting departure time:', time);
        setDepartureTime(time);
    };

    const handleSeatsChange = (newSelectedSeats) => {
        setSelectedSeats(newSelectedSeats);
    };

    const handleBooking = () => {
        if (!fromCity || !toCity || !departureTime || selectedSeats.length === 0) {
            toast.error('Please select all required details: city, departure time, and at least one seat');
            return;
        }

        // Debug log
        console.log('Navigating to checkout with data:', {
            bus,
            selectedSeats,
            fromCity,
            toCity,
            departureTime
        });

        // Ensure all required data is present
        if (!bus || !bus.id || !bus.price) {
            toast.error('Invalid bus information');
            return;
        }

        navigate('/checkout', {
            state: {
                bus: {
                    ...bus,
                    operatorAddress: '0x1234567890123456789012345678901234567890' // Add operator address
                },
                selectedSeats,
                fromCity,
                toCity,
                departureTime
            }
        });
    };

    if (loading) {
        return (
            <div className='w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[10ch] text-center'>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Loading...</h1>
            </div>
        );
    }

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
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="col-span-1 space-y-8">
                    <img src={bus.image} alt={`${bus.name} Image`} className="w-full aspect-[3/2] rounded-md object-contain"/>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">
                            {bus.name}
                            <span className="text-base font-normal text-neutral-400 dark:text-neutral-500 ml-3">
                                {bus.brand}
                            </span>
                        </h1>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`text-sm ${
                                            i < Math.floor(bus.rating)
                                                ? 'text-yellow-400'
                                                : 'text-neutral-300 dark:text-neutral-600'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-neutral-600 dark:text-neutral-400">
                                ({bus.rating})
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-neutral-600 dark:text-neutral-400">Passengers</p>
                                <p className="font-medium">{bus.passengers}</p>
                            </div>
                            <div>
                                <p className="text-neutral-600 dark:text-neutral-400">Plate Number</p>
                                <p className="font-medium">{bus.plateNumber}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 space-y-8">
                    <Destination 
                        fromCity={fromCity}
                        toCity={toCity}
                        setFromCity={handleFromCityChange}
                        setToCity={handleToCityChange}
                    />
                    <DepartTime 
                        departureTime={departureTime}
                        setDepartureTime={handleDepartureTimeChange}
                    />
                    <BusSeatLayout onSeatsChange={handleSeatsChange} />
                    
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-neutral-600 dark:text-neutral-400">Price per ticket</span>
                            <span className="font-bold">{bus.price} ETH</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-neutral-600 dark:text-neutral-400">Total Price</span>
                            <span className="font-bold">{(bus.price * selectedSeats.length).toFixed(3)} ETH</span>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleBooking}
                                className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors"
                                disabled={selectedSeats.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                        <div className="text-sm text-neutral-500">
                            <p>Debug Info:</p>
                            <p>From City: {fromCity || 'Not selected'}</p>
                            <p>To City: {toCity || 'Not selected'}</p>
                            <p>Departure Time: {departureTime || 'Not selected'}</p>
                            <p>Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</p>
                            <p>Loading: {loading ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;