import React from "react";
import { motion } from "framer-motion";
import { FaBus, FaLock, FaTicketAlt, FaClock, FaWallet, FaGlobe } from "react-icons/fa";

const services = [
  {
    icon: <FaTicketAlt className="text-3xl text-violet-500" />,
    title: "Instant Ticket Booking",
    description: "Book bus tickets in just a few clicks with real-time seat availability and instant confirmation.",
  },
  {
    icon: <FaLock className="text-3xl text-red-400" />,
    title: "Blockchain-Powered Security",
    description: "Enjoy tamper-proof transactions and secure ticket records using blockchain technology.",
  },
  {
    icon: <FaClock className="text-3xl text-yellow-400" />,
    title: "Real-Time Schedules",
    description: "Access up-to-date bus schedules, routes, and arrival timings anytime, anywhere.",
  },
  {
    icon: <FaWallet className="text-3xl text-green-400" />,
    title: "Transparent Pricing",
    description: "Say goodbye to hidden fees with fair and transparent ticket pricing.",
  },
  {
    icon: <FaBus className="text-3xl text-blue-400" />,
    title: "Nationwide Bus Network",
    description: "Choose from a wide range of bus operators across multiple routes and cities.",
  },
  {
    icon: <FaGlobe className="text-3xl text-cyan-400" />,
    title: "Decentralized Ticketing",
    description: "Your tickets are stored on a secure distributed ledger, eliminating risks of fraud or loss.",
  },
];

const Services = () => {
  return (
    <div className="w-full min-h-screen px-6 md:px-16 lg:px-28 pt-[10ch] pb-[6ch] bg-neutral-900 text-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl lg:text-5xl font-bold text-violet-400 mb-12 text-center">
          Our Services
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-neutral-800 p-6 rounded-2xl shadow-md hover:shadow-violet-600/30 transition-all"
            >
              <div className="mb-4">{service.icon}</div>
              <h2 className="text-2xl font-semibold text-white mb-2">{service.title}</h2>
              <p className="text-neutral-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Services;