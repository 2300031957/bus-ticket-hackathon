import React from 'react'
import { FaMapPin, FaEnvelope, FaPhone } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

import Logo from "../../assets/logo.png";

const Footer = () => {
  const handleEmailClick = (email) => {
    window.location.href = `mailto:2300031957@kluniversity.in`;
  };

  const handlePhoneClick = (phone) => {
    window.location.href = `tel:+918790008359`;
  };

  return (
    <footer className="w-full px-4 lg:px-28 md:px-16 sm:px-7 py-8 bg-neutral-200/60 dark:bg-neutral-900/70">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-between">
        
        {/* Logo and About Section */}
        <div className="space-y-5">
          <Link to="/" className='text-xl text-neutral-800 dark:text-neutral-200 font-bold'>
            <img src={Logo} alt="logo" className="w-55 h-auto object-contain" />
          </Link>
          <p className="text-neutral-600 dark:text-neutral-500 text-base font-normal pr-10">
            Your trusted partner for comfortable and reliable bus travel experiences.
          </p>
        </div>

        {/* About Us Section */}
        <div className="space-y-7">
          <h1 className="text-lg font-medium">About Us</h1>
          <ul className="space-y-2 text-neutral-600 dark:text-neutral-500 text-base font-normal">
            <li><Link to="/about" className='hover:text-violet-600 ease-in-out duration-300'>About Us</Link></li>
            <li><Link to="/contact" className='hover:text-violet-600 ease-in-out duration-300'>Contact Us</Link></li>
            <li><Link to="/privacy" className='hover:text-violet-600 ease-in-out duration-300'>Privacy Policy</Link></li>
            <li><Link to="/terms" className='hover:text-violet-600 ease-in-out duration-300'>Terms and Conditions</Link></li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="space-y-7">
          <h1 className="text-lg font-medium">Services</h1>
          <ul className="space-y-2 text-neutral-600 dark:text-neutral-500 text-base font-normal">
            <li><Link to="/safety" className='hover:text-violet-600 ease-in-out duration-300'>Safety Guarantee</Link></li>
            <li><Link to="/faq" className='hover:text-violet-600 ease-in-out duration-300'>FAQ & Support</Link></li>
            <li><Link to="/customer-care" className='hover:text-violet-600 ease-in-out duration-300'>24/7 Customer Care</Link></li>
            <li><Link to="/cancellation" className='hover:text-violet-600 ease-in-out duration-300'>Cancellation Policy</Link></li>
          </ul>
        </div>

        {/* Get In Touch Section */}
        <div className="space-y-7">
          <h1 className="text-lg font-medium">Get In Touch</h1>
          <div className="space-y-4">
            <div className="flex gap-x-2">
              <FaMapPin className='text-2xl text-neutral-600 dark:text-neutral-500' />
              <div className="flex flex-col">
                <p className="text-xs text-neutral-600 dark:text-neutral-500">For Support & Reservations</p>
                <p className="hover:text-red-600 ease-in-out duration-300 cursor-pointer" onClick={() => window.open('https://maps.google.com/?q=KLEF,+Green+Fields,+Vaddeswaram,+Andra+Pradesh+India')}>
                  KLEF, Green Fields, Vaddeswaram, Andra Pradesh India
                </p>
              </div>
            </div>
            <div className="flex gap-x-2">
              <FaPhone className='text-2xl text-neutral-600 dark:text-neutral-500' />
              <p className="hover:text-red-600 ease-in-out duration-300 cursor-pointer" onClick={() => handlePhoneClick('+918790008359')}>
                +91 8790008359
              </p>
            </div>
          </div>
        </div>

      </div>
      {/* Credits Section */}
      <div className="text-sm text-neutral-600 dark:text-neutral-500 text-center py-6">
        <p className="mb-4">Designed & Developed with ❤️ by</p>
        <div className="flex justify-center">
          <table className="table-auto border-collapse border border-neutral-300 dark:border-neutral-600">
            <thead>
              <tr className="bg-neutral-200 dark:bg-neutral-700">
                <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-2 text-left">Name</th>
                <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-2 text-left">Email ID</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2 font-semibold text-violet-600 hover:text-red-600 cursor-pointer transition-all duration-300">
                  Likith Prabhu
                </td>
                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2 cursor-pointer" onClick={() => handleEmailClick('2300031957@kluniversity.in')}>
                  2300031957@kluniversity.in
                </td>
              </tr>
              <tr className="hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2 font-semibold text-violet-600 hover:text-red-600 cursor-pointer transition-all duration-300">
                  T Venkateswar Rao
                </td>
                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2 cursor-pointer" onClick={() => handleEmailClick('2300032725@kluniversity.in')}>
                  2300030975@kluniversity.in
                </td>
              </tr>
              <tr className="hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2 font-semibold text-violet-600 hover:text-red-600 cursor-pointer transition-all duration-300">
                  P Veera Rama Sasi Kiran
                </td>
                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2 cursor-pointer" onClick={() => handleEmailClick('2300030795@kluniversity.in')}>
                  2300031176@kluniversity.in
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
