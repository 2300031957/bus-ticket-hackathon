import React from 'react';
import { motion } from 'framer-motion';
import { FaHeadset, FaWhatsapp, FaPhone, FaEnvelope, FaClock, FaTicketAlt, FaShieldAlt, FaQuestionCircle } from 'react-icons/fa';

const CustomerCare = () => {
  const supportFeatures = [
    {
      icon: <FaHeadset className="text-4xl text-violet-400" />,
      title: "24/7 Live Support",
      description: "Round-the-clock assistance for all your queries",
      details: "Our support team is always ready to help you"
    },
    {
      icon: <FaWhatsapp className="text-4xl text-violet-400" />,
      title: "WhatsApp Support",
      description: "Quick responses through WhatsApp",
      details: "Get instant help for your booking queries"
    },
    {
      icon: <FaTicketAlt className="text-4xl text-violet-400" />,
      title: "Booking Assistance",
      description: "Help with ticket booking and modifications",
      details: "Expert guidance for all booking-related issues"
    },
    {
      icon: <FaShieldAlt className="text-4xl text-violet-400" />,
      title: "Security Support",
      description: "Assistance with account security",
      details: "Help with password reset and security concerns"
    }
  ];

  const quickLinks = [
    {
      icon: <FaQuestionCircle className="text-2xl text-violet-400" />,
      title: "FAQ",
      description: "Find answers to common questions",
      link: "/faq"
    },
    {
      icon: <FaTicketAlt className="text-2xl text-violet-400" />,
      title: "Cancellation Policy",
      description: "Learn about our cancellation rules",
      link: "/cancellation"
    },
    {
      icon: <FaShieldAlt className="text-2xl text-violet-400" />,
      title: "Safety Guarantee",
      description: "Understand our safety measures",
      link: "/safety"
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
            24/7 Customer Care
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            We're here to help you anytime, anywhere. Choose your preferred way to get support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {supportFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-800 p-6 rounded-lg shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {feature.icon}
                <h3 className="text-xl font-semibold text-violet-300">{feature.title}</h3>
                <p className="text-neutral-300 font-medium">{feature.description}</p>
                <p className="text-neutral-400">{feature.details}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-violet-900/30 p-8 rounded-lg"
          >
            <h2 className="text-2xl font-semibold text-violet-300 mb-6">Contact Options</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <FaPhone className="text-2xl text-violet-400 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-violet-300">Phone Support</h3>
                  <p className="text-neutral-300">+91 8790008359</p>
                  <p className="text-neutral-400">Available 24/7</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaWhatsapp className="text-2xl text-violet-400 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-violet-300">WhatsApp Support</h3>
                  <p className="text-neutral-300">+91 8790008359</p>
                  <p className="text-neutral-400">Available 24/7</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaEnvelope className="text-2xl text-violet-400 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-violet-300">Email Support</h3>
                  <p className="text-neutral-300">support@ticketease.com</p>
                  <p className="text-neutral-400">Response within 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-neutral-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-violet-300 mb-4">Quick Links</h3>
              <div className="space-y-4">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.link}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-neutral-700 transition-colors duration-200"
                  >
                    {link.icon}
                    <div>
                      <h4 className="font-medium text-neutral-200">{link.title}</h4>
                      <p className="text-neutral-400">{link.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-violet-900/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-violet-300 mb-4">Support Hours</h3>
              <div className="space-y-2 text-neutral-300">
                <p>Phone & WhatsApp: 24/7</p>
                <p>Email Support: 24/7</p>
                <p>Response Time: Immediate for urgent matters</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerCare; 