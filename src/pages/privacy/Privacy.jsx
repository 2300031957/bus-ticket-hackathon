import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="w-full min-h-screen px-6 md:px-16 lg:px-28 pt-[10ch] pb-[6ch] bg-neutral-900 text-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <h1 className="text-4xl lg:text-5xl font-bold text-violet-400">
          Privacy Policy
        </h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-violet-300 mb-4">1. Information We Collect</h2>
            <p className="text-neutral-300 leading-relaxed">
              We collect information that you provide directly to us, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mt-2">
              <li>Personal identification information (Name, email address, phone number)</li>
              <li>Payment information for ticket purchases</li>
              <li>Travel preferences and booking history</li>
              <li>Device and usage information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-violet-300 mb-4">2. How We Use Your Information</h2>
            <p className="text-neutral-300 leading-relaxed">
              We use the collected information for various purposes:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mt-2">
              <li>To process and manage your bookings</li>
              <li>To improve our services and user experience</li>
              <li>To communicate with you about your bookings and updates</li>
              <li>To ensure the security of our platform</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-violet-300 mb-4">3. Data Security</h2>
            <p className="text-neutral-300 leading-relaxed">
              We implement appropriate security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mt-2">
              <li>Encryption of sensitive data</li>
              <li>Secure payment processing</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-violet-300 mb-4">4. Your Rights</h2>
            <p className="text-neutral-300 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mt-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-violet-300 mb-4">5. Contact Us</h2>
            <p className="text-neutral-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="list-none text-neutral-300 space-y-2 mt-2">
              <li>Email: privacy@ticketease.com</li>
              <li>Phone: +91 8790008359</li>
              <li>Address: KLEF, Green Fields, Vaddeswaram, Andhra Pradesh, India</li>
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy; 