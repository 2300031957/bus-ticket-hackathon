import React from 'react';
import { motion } from 'framer-motion';
import { FaBus, FaTicketAlt, FaShieldAlt, FaHeadset, FaClock, FaMapMarkedAlt } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaBus className="text-4xl text-violet-400" />,
      title: "Wide Range of Buses",
      description: "Choose from a variety of buses including luxury, sleeper, and semi-sleeper options with different amenities."
    },
    {
      icon: <FaTicketAlt className="text-4xl text-violet-400" />,
      title: "Easy Booking",
      description: "Simple and secure booking process with multiple payment options including UPI, cards, and cryptocurrency."
    },
    {
      icon: <FaShieldAlt className="text-4xl text-violet-400" />,
      title: "Secure Payments",
      description: "Your payments are protected with advanced encryption and blockchain technology for maximum security."
    },
    {
      icon: <FaHeadset className="text-4xl text-violet-400" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you with bookings, cancellations, and any queries."
    },
    {
      icon: <FaClock className="text-4xl text-violet-400" />,
      title: "Real-time Updates",
      description: "Get instant notifications about your booking status, bus delays, and schedule changes."
    },
    {
      icon: <FaMapMarkedAlt className="text-4xl text-violet-400" />,
      title: "Route Information",
      description: "Detailed information about routes, stops, and estimated travel times for better planning."
    }
  ];

  return (
    <div className="w-full min-h-screen px-6 md:px-16 lg:px-28 pt-[10ch] pb-[6ch] bg-neutral-900 text-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="max-w-6xl mx-auto space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-violet-400">
            Our Services
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Experience seamless bus travel with our comprehensive range of services designed for your comfort and convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-800 p-6 rounded-lg shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {service.icon}
                <h3 className="text-xl font-semibold text-violet-300">{service.title}</h3>
                <p className="text-neutral-300">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-violet-900/30 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-violet-300 mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-neutral-300 space-y-2">
            <li>Blockchain-powered secure ticket system</li>
            <li>Multiple payment options for your convenience</li>
            <li>Real-time bus tracking and updates</li>
            <li>Easy cancellation and refund process</li>
            <li>Dedicated customer support team</li>
            <li>Regular discounts and offers</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Services;