import React, { useState } from 'react';
import { GiSteeringWheel } from 'react-icons/gi';
import { MdOutlineChair } from 'react-icons/md';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';

const Seat = ({ seatNumber, isSelected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
                isSelected
                    ? 'bg-violet-600 text-white'
                    : 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600'
            }`}
        >
            {seatNumber}
        </button>
    );
};

const BusSeatLayout = ({ onSeatsChange }) => {
    const totalSeat = 41;
    const [selectedSeat, setSelectedSeat] = useState([]);

    const handleSeatClick = (seatNumber) => {
        setSelectedSeat((prev) => {
            let newSelectedSeats;
            if (prev.includes(seatNumber)) {
                newSelectedSeats = prev.filter(seat => seat !== seatNumber);
            } else if (prev.length < 10) {
                newSelectedSeats = [...prev, seatNumber];
            } else {
                alert('Oops! Bro You can select only 10 seats!');
                return prev;
            }
            // Notify parent component of seat changes
            if (onSeatsChange) {
                onSeatsChange(newSelectedSeats);
            }
            return newSelectedSeats;
        });
    };

    const renderSeats = () => {
        return Array.from({ length: totalSeat }, (_, i) => (
            <Seat 
                key={i + 1} 
                seatNumber={i + 1} 
                isSelected={selectedSeat.includes(i + 1)} 
                onClick={() => handleSeatClick(i + 1)} 
            />
        ));
    };

    return (
        <div className='space-y-5'>
            <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">
                Choose Your Seat
            </h2>

            {/* Bus Seat Layout */}
            <div className="w-full flex justify-between">
                <div className="flex-1 w-full flex">
                    <div className="w-full flex gap-x-5 items-stretch">
                        <div className="w-10 h-full border-r-2 border-dashed border-neutral-300 dark:border-neutral-800">
                            <GiSteeringWheel className='text-3xl mt-6 text-violet-600 -rotate-90' />
                        </div>

                        {/* Seats Layout */}
                        <div className="flex flex-col items-center">
                            <div className="flex-1 space-y-4">
                                <div className="w-full grid grid-cols-10 gap-x-3">{renderSeats().slice(0, 10)}</div>
                                <div className="w-full grid grid-cols-10 gap-x-3">{renderSeats().slice(10, 20)}</div>
                                <div className="w-full grid grid-cols-10 gap-x-3">
                                    <div className="col-span-9"></div>
                                    {renderSeats().slice(20, 21)}
                                </div>
                                <div className="w-full grid grid-cols-10 gap-x-3">{renderSeats().slice(21, 31)}</div>
                                <div className="w-full grid grid-cols-10 gap-x-3">{renderSeats().slice(31, 41)}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instructions and Information */}
                <div className="space-y-3 w-28">
                    <div className="flex items-center gap-x-2">
                        <MdOutlineChair className='text-lg text-neutral-500 -rotate-90'/>
                        <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">Available</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <MdOutlineChair className='text-lg text-red-500 -rotate-90'/>
                        <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">Booked</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <MdOutlineChair className='text-lg text-violet-500 -rotate-90'/>
                        <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">Selected</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <RiMoneyRupeeCircleLine className='text-lg text-neutral-500'/>
                        <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">Rs. 750</p>
                    </div>
                </div>
            </div>

            {/* Selected Seats */}
            {selectedSeat.length > 0 && (
                <div className="!mt-10">
                    <h3 className="text-lg font-bold">Selected Seats:</h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedSeat.map(seat => (
                            <div key={seat} className="w-10 h-10 rounded-md flex items-center justify-center bg-violet-600/30 text-lg font-medium">
                                {seat}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Calculate Price */}
            {selectedSeat.length > 0 && (
                <div className="!mt-5 flex items-center gap-x-4">
                    <h3 className="text-lg font-bold">Total Price:</h3>
                    <p className="text-lg font-medium">Rs. {selectedSeat.length * 750}</p>
                    <span className="text-sm text-neutral-400 dark:text-neutral-600 font-normal">(Including all taxes)</span>
                </div>
            )}
        </div>
    );
};

export default BusSeatLayout;
