import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../Web3Context';
import { toast } from 'react-hot-toast';

const TicketList = () => {
  const { wallet, getTicketBalance, loading, error } = useWeb3();
  const [tickets, setTickets] = useState([]);
  const [refundingTicketId, setRefundingTicketId] = useState(null);

  useEffect(() => {
    if (wallet.connected) {
      fetchTickets();
    }
  }, [wallet.connected]);

  const fetchTickets = async () => {
    try {
      const balance = await getTicketBalance();
      setTickets(Array(balance).fill({ isValid: true }));
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      toast.error('Failed to fetch tickets');
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
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
          key={index}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">Ticket #{index + 1}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Purchased on: {formatDate(Date.now() / 1000)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Status: {ticket.isValid ? 'Valid' : 'Refunded'}
              </p>
            </div>
            {ticket.isValid && (
              <button
                onClick={() => setRefundingTicketId(index)}
                disabled={refundingTicketId === index}
                className={`px-4 py-2 rounded-md ${
                  refundingTicketId === index
                    ? 'bg-gray-400'
                    : 'bg-red-500 hover:bg-red-600'
                } text-white font-medium transition-colors`}
              >
                {refundingTicketId === index ? 'Processing...' : 'Refund'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList; 