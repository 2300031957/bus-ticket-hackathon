import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserShield, FaLock, FaHandshake, FaCertificate, FaCheckCircle } from 'react-icons/fa';

const Safety = () => {
  const safetyFeatures = [
    {
      icon: <FaShieldAlt className="text-4xl text-violet-400" />,
      title: "Secure Transactions",
      description: "All payments are processed through encrypted channels with blockchain verification for maximum security."
    },
    {
      icon: <FaUserShield className="text-4xl text-violet-400" />,
      title: "Verified Bus Operators",
      description: "We partner only with licensed and verified bus operators who meet our strict safety standards."
    },
    {
      icon: <FaLock className="text-4xl text-violet-400" />,
      title: "Data Protection",
      description: "Your personal information is protected with advanced encryption and strict privacy policies."
    },
    {
      icon: <FaHandshake className="text-4xl text-violet-400" />,
      title: "Trusted Partners",
      description: "We work with trusted payment gateways and service providers to ensure your safety."
    },
    {
      icon: <FaCertificate className="text-4xl text-violet-400" />,
      title: "Quality Assurance",
      description: "Regular audits and quality checks ensure consistent service standards across all operations."
    },
    {
      icon: <FaCheckCircle className="text-4xl text-violet-400" />,
      title: "Satisfaction Guarantee",
      description: "We guarantee your satisfaction with our services or your money back."
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
            Safety Guarantee
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Your safety and security are our top priorities. We implement multiple layers of protection to ensure a safe and reliable booking experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safetyFeatures.map((feature, index) => (
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
                <p className="text-neutral-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 space-y-8">
          <div className="bg-violet-900/30 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-violet-300 mb-4">Our Safety Standards</h2>
            <ul className="list-disc list-inside text-neutral-300 space-y-2">
              <li>Regular safety audits of all bus operators</li>
              <li>24/7 monitoring of bus operations</li>
              <li>Emergency response protocols</li>
              <li>Driver verification and training programs</li>
              <li>Vehicle maintenance tracking</li>
              <li>Insurance coverage for all bookings</li>
            </ul>
          </div>

          <div className="bg-neutral-800 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-violet-300 mb-4">Your Rights</h2>
            <ul className="list-disc list-inside text-neutral-300 space-y-2">
              <li>Right to safe and comfortable travel</li>
              <li>Right to accurate information</li>
              <li>Right to privacy and data protection</li>
              <li>Right to fair pricing and refunds</li>
              <li>Right to customer support</li>
              <li>Right to file complaints and receive resolution</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Safety; 