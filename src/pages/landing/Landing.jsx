import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBus, FaArrowRight } from 'react-icons/fa';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 to-violet-800 dark:from-violet-900 dark:to-violet-950">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex justify-center mb-8">
            <FaBus className="text-6xl text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to TickeTEase
          </h1>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Your one-stop solution for hassle-free bus ticket booking. Experience seamless travel planning with our secure and user-friendly platform.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/login"
              className="inline-flex items-center bg-white text-violet-600 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-violet-50 transition-colors"
            >
              Get Started
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {[
            {
              title: 'Easy Booking',
              description: 'Book your tickets in just a few clicks'
            },
            {
              title: 'Secure Payments',
              description: 'Multiple payment options with top-notch security'
            },
            {
              title: 'Real-time Updates',
              description: 'Get instant notifications about your journey'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/80">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing; 