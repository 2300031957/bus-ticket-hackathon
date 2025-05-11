import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBus, FaSearch, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-violet-600 to-violet-800 dark:from-violet-900 dark:to-violet-950 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Book Your Bus Journey
            </h1>
            <p className="text-xl mb-8">
              Find and book bus tickets to your favorite destinations
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-3xl mx-auto bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="From"
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-neutral-700 dark:text-white"
                />
              </div>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="To"
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-neutral-700 dark:text-white"
                />
              </div>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-neutral-700 dark:text-white"
                />
              </div>
            </div>
            <button className="w-full mt-4 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-semibold transition-colors">
              Search Buses
            </button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800 dark:text-white">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md"
          >
            <FaBus className="text-4xl text-violet-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-white">
              Wide Network
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Access to thousands of bus routes across the country
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md"
          >
            <FaSearch className="text-4xl text-violet-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-white">
              Easy Booking
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Simple and secure booking process with multiple payment options
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md"
          >
            <FaMapMarkerAlt className="text-4xl text-violet-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-white">
              Real-time Tracking
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Track your bus in real-time and get live updates
            </p>
          </motion.div>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="bg-neutral-100 dark:bg-neutral-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800 dark:text-white">
            Popular Routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {['Mumbai', 'Delhi', 'Bangalore', 'Chennai'].map((city) => (
              <Link
                key={city}
                to={`/bus?destination=${city}`}
                className="bg-white dark:bg-neutral-700 p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <p className="text-lg font-semibold text-neutral-800 dark:text-white">
                  {city}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 