import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book a bus ticket?",
      answer: "Booking a bus ticket is simple! Just select your departure and destination cities, choose your travel date, select a bus, pick your seats, and proceed to payment. You can pay using UPI, credit/debit cards, or cryptocurrency."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept multiple payment methods including UPI (PhonePe, Google Pay, Paytm), credit/debit cards, and cryptocurrency (Ethereum). All payments are processed securely through our encrypted payment gateway."
    },
    {
      question: "How does the blockchain ticket system work?",
      answer: "When you book a ticket, it's minted as an NFT on the blockchain. This ensures your ticket is secure, tamper-proof, and easily verifiable. You can view your NFT ticket in your wallet or through our platform."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking. The refund amount depends on when you cancel: full refund for cancellations 24 hours before departure, 50% refund for cancellations 12-24 hours before, and no refund for cancellations less than 12 hours before departure."
    },
    {
      question: "How do I track my bus?",
      answer: "You can track your bus in real-time through our app or website. We provide live updates about the bus location, estimated arrival time, and any delays."
    },
    {
      question: "What if I miss my bus?",
      answer: "If you miss your bus, please contact our customer support immediately. Depending on the circumstances and availability, we may be able to help you with the next available bus, though additional charges may apply."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our customer support 24/7 through multiple channels: phone (+91 8790008359), email (support@ticketease.com), or through our in-app chat support."
    },
    {
      question: "Are there any discounts available?",
      answer: "Yes, we offer various discounts including early bird discounts, group booking discounts, and seasonal offers. You can check our offers section or subscribe to our newsletter to stay updated on current promotions."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen px-6 md:px-16 lg:px-28 pt-[10ch] pb-[6ch] bg-neutral-900 text-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-violet-400">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Find answers to common questions about booking, payments, and our services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-800 rounded-lg overflow-hidden"
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center hover:bg-neutral-700 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-violet-300">{faq.question}</h3>
                {openIndex === index ? (
                  <FaChevronUp className="text-violet-400" />
                ) : (
                  <FaChevronDown className="text-violet-400" />
                )}
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
                >
                  <p className="text-neutral-300">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-violet-900/30 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-violet-300 mb-4">Still have questions?</h2>
          <p className="text-neutral-300 mb-4">
            Our customer support team is available 24/7 to help you with any queries.
          </p>
          <div className="space-y-2 text-neutral-300">
            <p>Phone: +91 8790008359</p>
            <p>Email: support@ticketease.com</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ; 