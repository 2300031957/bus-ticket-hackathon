import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaTicketAlt, FaCog, FaHistory, FaWallet } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const userEmail = localStorage.getItem('userEmail');

  // Mock ticket data
  const tickets = [
    {
      id: 1,
      from: 'Mumbai',
      to: 'Delhi',
      date: '2024-03-15',
      time: '10:00 AM',
      status: 'Confirmed',
      price: '₹1200'
    },
    {
      id: 2,
      from: 'Bangalore',
      to: 'Chennai',
      date: '2024-03-20',
      time: '08:00 AM',
      status: 'Completed',
      price: '₹800'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-8">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center">
              <FaUser className="text-4xl text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">
                {userEmail}
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300">
                Member since March 2024
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md mb-8">
          <div className="flex border-b border-neutral-200 dark:border-neutral-700">
            <button
              onClick={() => setActiveTab('tickets')}
              className={`flex-1 py-4 px-6 text-center ${
                activeTab === 'tickets'
                  ? 'text-violet-600 dark:text-violet-400 border-b-2 border-violet-600 dark:border-violet-400'
                  : 'text-neutral-600 dark:text-neutral-300'
              }`}
            >
              <FaTicketAlt className="inline-block mr-2" />
              My Tickets
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-4 px-6 text-center ${
                activeTab === 'history'
                  ? 'text-violet-600 dark:text-violet-400 border-b-2 border-violet-600 dark:border-violet-400'
                  : 'text-neutral-600 dark:text-neutral-300'
              }`}
            >
              <FaHistory className="inline-block mr-2" />
              History
            </button>
            <button
              onClick={() => setActiveTab('wallet')}
              className={`flex-1 py-4 px-6 text-center ${
                activeTab === 'wallet'
                  ? 'text-violet-600 dark:text-violet-400 border-b-2 border-violet-600 dark:border-violet-400'
                  : 'text-neutral-600 dark:text-neutral-300'
              }`}
            >
              <FaWallet className="inline-block mr-2" />
              Wallet
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-4 px-6 text-center ${
                activeTab === 'settings'
                  ? 'text-violet-600 dark:text-violet-400 border-b-2 border-violet-600 dark:border-violet-400'
                  : 'text-neutral-600 dark:text-neutral-300'
              }`}
            >
              <FaCog className="inline-block mr-2" />
              Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'tickets' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-white">
                  Upcoming Journeys
                </h2>
                {tickets.map((ticket) => (
                  <motion.div
                    key={ticket.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-4 mb-4"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-neutral-800 dark:text-white">
                          {ticket.from} → {ticket.to}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-300">
                          {ticket.date} | {ticket.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-violet-600 dark:text-violet-400">
                          {ticket.price}
                        </p>
                        <span className="text-sm text-green-600 dark:text-green-400">
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-white">
                  Past Journeys
                </h2>
                <p className="text-neutral-600 dark:text-neutral-300">
                  No past journeys found.
                </p>
              </div>
            )}

            {activeTab === 'wallet' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-white">
                  Wallet Balance
                </h2>
                <div className="bg-violet-50 dark:bg-violet-900 rounded-lg p-6 text-center">
                  <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                    ₹0.00
                  </p>
                  <button className="mt-4 bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-lg">
                    Add Money
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-white">
                  Account Settings
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Email
                    </label>
                    <input
                      type="email"
                      value={userEmail}
                      disabled
                      className="mt-1 block w-full rounded-md border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Change Password
                    </label>
                    <input
                      type="password"
                      placeholder="New Password"
                      className="mt-1 block w-full rounded-md border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-700"
                    />
                  </div>
                  <button className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-lg">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 