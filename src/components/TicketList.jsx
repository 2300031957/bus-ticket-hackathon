import React, { useState, useEffect, useContext } from 'react';
import { Web3Context } from '../Web3Context';

const TicketList = () => {
  const { getUserTickets, refundTicket, loading, error } = useContext(Web3Context);
  const [tickets, setTickets] = useState([]);
  const [refundingTicketId, setRefundingTicketId] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const userTickets = await getUserTickets();
    setTickets(userTickets);
  };

  const handleRefund = async (ticketId) => {
    setRefundingTicketId(ticketId);
    const success = await refundTicket(ticketId);
    if (success) {
      await fetchTickets();
    }
    setRefundingTicketId(null);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

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
      {tickets.map((ticket) => (
        <div
          key={ticket.ticketId}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">Ticket #{ticket.ticketId}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Purchased on: {formatDate(ticket.purchaseTime)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Status: {ticket.isValid ? 'Valid' : 'Refunded'}
              </p>
            </div>
            {ticket.isValid && (
              <button
                onClick={() => handleRefund(ticket.ticketId)}
                disabled={refundingTicketId === ticket.ticketId}
                className={`px-4 py-2 rounded-md ${
                  refundingTicketId === ticket.ticketId
                    ? 'bg-gray-400'
                    : 'bg-red-500 hover:bg-red-600'
                } text-white font-medium transition-colors`}
              >
                {refundingTicketId === ticket.ticketId ? 'Processing...' : 'Refund'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList; 