import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="w-full min-h-screen px-6 md:px-16 lg:px-28 pt-[10ch] pb-[6ch] bg-neutral-900 text-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <h1 className="text-4xl lg:text-5xl font-bold text-violet-400">
          Terms of Service
        </h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-violet-300 mb-4">1. Acceptance of Terms</h2>
            <p className="text-neutral-300 leading-relaxed">
              By accessing and using TicketEase, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-violet-300 mb-4">2. User Accounts</h2>
            <p className="text-neutral-300 leading-relaxed">
              To use our services, you must:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mt-2">
              <li>Be at least 18 years old</li>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Not share your account credentials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-violet-300 mb-4">3. Booking and Payments</h2>
            <p className="text-neutral-300 leading-relaxed">
              When making a booking:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mt-2">
              <li>All prices are in Indian Rupees (INR)</li>
              <li>Payments are processed securely through our payment gateway</li>
              <li>Refunds are subject to our cancellation policy</li>
              <li>Additional charges may apply for changes to bookings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-violet-300 mb-4">4. Cancellation Policy</h2>
            <p className="text-neutral-300 leading-relaxed">
              Our cancellation policy is as follows:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mt-2">
              <li>Cancellations made 24 hours before departure: Full refund</li>
              <li>Cancellations made 12-24 hours before departure: 50% refund</li>
              <li>Cancellations made less than 12 hours before departure: No refund</li>
              <li>Refunds will be processed within 5-7 business days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-violet-300 mb-4">5. Prohibited Activities</h2>
            <p className="text-neutral-300 leading-relaxed">
              Users are prohibited from:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mt-2">
              <li>Using the service for any illegal purpose</li>
              <li>Attempting to access unauthorized areas of the system</li>
              <li>Interfering with the proper functioning of the service</li>
              <li>Engaging in fraudulent activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-violet-300 mb-4">6. Limitation of Liability</h2>
            <p className="text-neutral-300 leading-relaxed">
              TicketEase is not liable for:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mt-2">
              <li>Any indirect, incidental, or consequential damages</li>
              <li>Delays or cancellations beyond our control</li>
              <li>Loss of data or unauthorized access to your account</li>
              <li>Any third-party services or products</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-violet-300 mb-4">7. Contact Information</h2>
            <p className="text-neutral-300 leading-relaxed">
              For any questions regarding these Terms of Service, please contact us at:
            </p>
            <ul className="list-none text-neutral-300 space-y-2 mt-2">
              <li>Email: legal@ticketease.com</li>
              <li>Phone: +91 8790008359</li>
              <li>Address: KLEF, Green Fields, Vaddeswaram, Andhra Pradesh, India</li>
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default Terms; 