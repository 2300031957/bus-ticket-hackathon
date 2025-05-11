import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="w-full min-h-screen px-6 md:px-16 lg:px-28 pt-[10ch] pb-[6ch] bg-neutral-900 text-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="max-w-4xl mx-auto space-y-10"
      >
        <h1 className="text-4xl lg:text-5xl font-bold text-violet-400">
          About Us
        </h1>

        <p className="text-lg leading-relaxed text-neutral-300">
          Welcome to <span className="text-violet-300 font-semibold">TicketEase</span> – your one-stop solution to hassle-free, secure, and transparent bus ticket bookings. We're reimagining travel convenience using the power of <span className="text-red-400 font-medium">BlockChain Technology</span>.
        </p>

        <p className="text-lg leading-relaxed text-neutral-300">
          Our mission is simple: <span className="text-white font-medium">make bus travel smooth, reliable, and trustworthy</span>. With real-time seat availability, tamper-proof transactions, and decentralized ticketing records, we ensure that your journey begins the moment you click "Reserve".
        </p>

        <p className="text-lg leading-relaxed text-neutral-300">
          Whether you're a daily commuter, a weekend explorer, or a long-distance traveler – we bring you the best deals, transparent pricing, and secure digital tickets – all in just a few clicks.
        </p>

        <p className="text-lg leading-relaxed text-neutral-300">
          Join us in building a smarter, safer, and more efficient future for public transport – powered by technology, driven by trust.
        </p>

        <div className="pt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-violet-700 hover:bg-violet-800 text-white font-medium py-3 px-6 rounded-md"
          >
            Start Booking Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default About;