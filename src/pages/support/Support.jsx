import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaWhatsapp, FaClock, FaHeadset, FaTicketAlt } from 'react-icons/fa';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const supportOptions = [
    {
      icon: <FaPhone className="text-4xl text-violet-400" />,
      title: "Phone Support",
      description: "Call us for immediate assistance",
      contact: "+91 8790008359",
      timing: "Available 24/7"
    },
    {
      icon: <FaEnvelope className="text-4xl text-violet-400" />,
      title: "Email Support",
      description: "Send us an email",
      contact: "support@ticketease.com",
      timing: "Response within 24 hours"
    },
    {
      icon: <FaWhatsapp className="text-4xl text-violet-400" />,
      title: "WhatsApp Support",
      description: "Chat with us on WhatsApp",
      contact: "+91 8790008359",
      timing: "Available 24/7"
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
            Customer Support
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            We're here to help you with any questions or concerns about your bus booking experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {supportOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-800 p-6 rounded-lg shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {option.icon}
                <h3 className="text-xl font-semibold text-violet-300">{option.title}</h3>
                <p className="text-neutral-300">{option.description}</p>
                <div className="space-y-2">
                  <p className="text-violet-400 font-medium">{option.contact}</p>
                  <div className="flex items-center justify-center space-x-2 text-neutral-400">
                    <FaClock />
                    <span>{option.timing}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-neutral-800 p-8 rounded-lg"
          >
            <h2 className="text-2xl font-semibold text-violet-300 mb-6">Contact Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-neutral-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:border-violet-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-neutral-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:border-violet-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-neutral-300 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:border-violet-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-neutral-300 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:border-violet-500 focus:outline-none"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 rounded transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-violet-900/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-violet-300 mb-4">Common Issues</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <FaTicketAlt className="text-violet-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-neutral-200">Ticket Issues</h4>
                    <p className="text-neutral-400">Problems with booking, cancellation, or refund</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <FaHeadset className="text-violet-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-neutral-200">Technical Support</h4>
                    <p className="text-neutral-400">Website or app related issues</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-neutral-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-violet-300 mb-4">Support Hours</h3>
              <div className="space-y-2 text-neutral-300">
                <p>Phone & WhatsApp: 24/7</p>
                <p>Email Support: 24/7</p>
                <p>Response Time: Within 24 hours</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Support; 