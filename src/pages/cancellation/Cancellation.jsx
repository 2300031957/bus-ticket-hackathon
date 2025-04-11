import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaMoneyBillWave, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const Cancellation = () => {
  const policies = [
    {
      icon: <FaClock className="text-4xl text-violet-400" />,
      title: "Standard Cancellation",
      description: "Cancellations made 24 hours before departure",
      details: "Full refund will be processed within 5-7 business days"
    },
    {
      icon: <FaMoneyBillWave className="text-4xl text-violet-400" />,
      title: "Partial Cancellation",
      description: "Cancellations made 12-24 hours before departure",
      details: "50% of the ticket amount will be refunded within 5-7 business days"
    },
    {
      icon: <FaExclamationTriangle className="text-4xl text-violet-400" />,
      title: "Late Cancellation",
      description: "Cancellations made less than 12 hours before departure",
      details: "No refund will be provided for late cancellations"
    },
    {
      icon: <FaCheckCircle className="text-4xl text-violet-400" />,
      title: "Special Cases",
      description: "Cancellations due to unforeseen circumstances",
      details: "Contact our customer support for assistance with special cases"
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
            Cancellation Policy
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Our cancellation policy is designed to be fair and transparent. Please review the following guidelines for cancellations and refunds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-800 p-6 rounded-lg shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {policy.icon}
                <h3 className="text-xl font-semibold text-violet-300">{policy.title}</h3>
                <p className="text-neutral-300 font-medium">{policy.description}</p>
                <p className="text-neutral-400">{policy.details}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="bg-violet-900/30 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-violet-300 mb-4">Refund Process</h2>
            <ol className="list-decimal list-inside text-neutral-300 space-y-2">
              <li>Submit cancellation request through our website or app</li>
              <li>Receive confirmation email with cancellation details</li>
              <li>Refund will be processed to the original payment method</li>
              <li>Processing time: 5-7 business days</li>
              <li>You will receive an email notification once refund is processed</li>
            </ol>
          </div>

          <div className="bg-neutral-800 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-violet-300 mb-4">Important Notes</h2>
            <ul className="list-disc list-inside text-neutral-300 space-y-2">
              <li>All cancellation requests must be made through our official channels</li>
              <li>Refund amount will be calculated based on the time of cancellation</li>
              <li>Service charges and convenience fees are non-refundable</li>
              <li>For group bookings, cancellation policy applies to each ticket individually</li>
              <li>In case of bus cancellation by the operator, full refund will be provided</li>
            </ul>
          </div>

          <div className="bg-violet-900/30 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-violet-300 mb-4">Need Help?</h2>
            <p className="text-neutral-300 mb-4">
              Our customer support team is available 24/7 to assist you with cancellations and refunds.
            </p>
            <div className="space-y-2 text-neutral-300">
              <p>Phone: +91 8790008359</p>
              <p>Email: support@ticketease.com</p>
              <p>WhatsApp: +91 8790008359</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Cancellation; 