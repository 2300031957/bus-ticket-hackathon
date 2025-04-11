import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../Web3Context';
import { toast } from 'react-hot-toast';

const TicketList = () => {
  const { wallet, contract, loading, error } = useWeb3();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (wallet.connected) {
      fetchTickets();
    }
  }, [wallet.connected]);

  const fetchTickets = async () => {
    try {
      // Get tickets from localStorage
      const storedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
      
      // Ensure tickets have the correct structure
      const validTickets = storedTickets.map(ticket => ({
        ...ticket,
        seats: Array.isArray(ticket.seats) ? ticket.seats : [ticket.seats]
      }));
      
      setTickets(validTickets);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      toast.error('Failed to fetch tickets');
    }
  };

  const formatDate = (timestamp) => {
    try {
      return new Date(timestamp).toLocaleString();
    } catch (error) {
      return 'Invalid date';
    }
  };

  const formatSeats = (seats) => {
    if (!seats) return 'No seats selected';
    if (Array.isArray(seats)) {
      return seats.join(', ');
    }
    return seats.toString();
  };

  if (!wallet.connected) {
    return (
      <div className="p-4 text-center text-gray-500">
        Please connect your wallet to view tickets
      </div>
    );
  }

  if (loading && tickets.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">
        {error}
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No tickets found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket, index) => (
        <div
          key={ticket.id || index}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">Ticket #{ticket.id || index + 1}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Bus ID: {ticket.busId || 'N/A'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Seats: {formatSeats(ticket.seats)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Price: {ticket.totalPrice ? parseFloat(ticket.totalPrice).toFixed(4) : '0'} ETH
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Purchased on: {formatDate(ticket.timestamp)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList; 