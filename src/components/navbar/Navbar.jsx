import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { LiaTimesSolid } from "react-icons/lia";
import { FaBars, FaPhone, FaMoon, FaSun, FaUser, FaSignOutAlt, FaTicketAlt, FaHistory, FaCog } from "react-icons/fa";
import Theme from "../theme/Theme";
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onLogout }) => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail');

    // Handle scroll direction with fade effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    // Check if user is logged in (you would typically get this from your auth context)
    useEffect(() => {
        // For demo purposes, we'll just check localStorage
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    }, []);

    const navLinks = [
        { name: "Home", link: "/" },
        { name: "Buses", link: "/bus" },
        { name: "About", link: "/about" },
        { name: "Contact", link: "/contact" },
    ];

    const handleClick = () => setOpen(!open);
    const handleClose = () => setOpen(false);
    const handleCall = () => {
        window.location.href = 'tel:+918790008359';
    };

    const handleLogout = () => {
        onLogout();
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        setIsProfileOpen(false);
        toast.success('Logged out successfully');
        navigate('/login');
    };

    return (
        <div
            className={`w-full h-[8ch] bg-neutral-100 dark:bg-neutral-900 flex items-center justify-between lg:px-28 md:px-16 sm:px-7 px-4 fixed top-0 z-50 shadow-md transition-all duration-500 ease-in-out transform ${
                showNavbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
            }`}
        >
            {/* Logo Section */}
            <Link to={"/"} className="flex-shrink-0">
                <img src={Logo} alt="logo" className="w-28 h-auto object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 text-base text-neutral-600 dark:text-neutral-300 font-medium">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.link}
                        className="border-transparent text-neutral-500 dark:text-neutral-300 hover:border-violet-500 hover:text-neutral-700 dark:hover:text-neutral-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Right Section (Phone & Theme) */}
            <div className="hidden lg:flex items-center space-x-6">
                <div 
                    onClick={handleCall}
                    className="relative bg-violet-600 rounded-md px-6 py-2 cursor-pointer flex items-center hover:bg-violet-700 transition-colors"
                >
                    <FaPhone className="text-white text-sm mr-2" />
                    <div className="text-white text-sm">
                        <p className="text-xs font-light">Need Help?</p>
                        <p className="text-xs font-medium">+91 8790008359</p>
                    </div>
                </div>
                <Theme />
            </div>

            {/* Toggle Button (Mobile) */}
            <button onClick={handleClick} className="lg:hidden text-neutral-600 dark:text-neutral-300">
                {open ? <LiaTimesSolid className="text-xl" /> : <FaBars className="text-xl" />}
            </button>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 left-0 w-full h-screen bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center space-y-6 text-lg font-medium text-neutral-600 dark:text-neutral-300 transform ${
                    open ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 lg:hidden`}
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.link}
                        onClick={handleClose}
                        className="hover:text-violet-600 transition"
                    >
                        {link.name}
                    </Link>
                ))}
                <div 
                    onClick={handleCall}
                    className="bg-violet-600 rounded-md px-6 py-2 cursor-pointer flex items-center hover:bg-violet-700 transition-colors"
                >
                    <FaPhone className="text-white text-sm mr-2" />
                    <div className="text-white text-sm">
                        <p className="text-xs font-light">Need Help?</p>
                        <p className="text-xs font-medium">+91 8790008359</p>
                    </div>
                </div>
                <button onClick={handleClose} className="absolute top-5 right-5 text-2xl">
                    <LiaTimesSolid />
                </button>
            </div>

            {/* Profile Dropdown */}
            <div className="hidden lg:flex items-center space-x-6">
                {isLoggedIn ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center space-x-2 p-2 rounded-lg text-neutral-500 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        >
                            <FaUser className="h-5 w-5" />
                            <span className="hidden sm:inline">{userEmail}</span>
                        </button>

                        <AnimatePresence>
                            {isProfileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-neutral-800 ring-1 ring-black ring-opacity-5"
                                >
                                    <div className="py-1" role="menu" aria-orientation="vertical">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                            role="menuitem"
                                        >
                                            <div className="flex items-center">
                                                <FaUser className="mr-2" />
                                                My Profile
                                            </div>
                                        </Link>
                                        <Link
                                            to="/tickets"
                                            className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                            role="menuitem"
                                        >
                                            <div className="flex items-center">
                                                <FaTicketAlt className="mr-2" />
                                                My Tickets
                                            </div>
                                        </Link>
                                        <Link
                                            to="/history"
                                            className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                            role="menuitem"
                                        >
                                            <div className="flex items-center">
                                                <FaHistory className="mr-2" />
                                                Booking History
                                            </div>
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                            role="menuitem"
                                        >
                                            <div className="flex items-center">
                                                <FaCog className="mr-2" />
                                                Settings
                                            </div>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                            role="menuitem"
                                        >
                                            <div className="flex items-center">
                                                <FaSignOutAlt className="mr-2" />
                                                Logout
                                            </div>
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="flex space-x-4">
                        <Link
                            to="/login"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-violet-600 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
