import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { LiaTimesSolid } from "react-icons/lia";
import { FaBars, FaPhone } from "react-icons/fa6";
import Theme from "../theme/Theme";


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/bus", label: "Bus" },
        { href: "/services", label: "Services" },
    ];

    const handleClick = () => setOpen(!open);
    const handleClose = () => setOpen(false);

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
                {navLinks.map((link, index) => (
                    <Link key={index} to={link.href} className="hover:text-violet-600 transition">
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* Right Section (Phone & Theme) */}
            <div className="hidden lg:flex items-center space-x-6">
                <div className="relative bg-violet-600 rounded-md px-6 py-2 cursor-pointer flex items-center">
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
                {navLinks.map((link, index) => (
                    <Link key={index} to={link.href} onClick={handleClose} className="hover:text-violet-600 transition">
                        {link.label}
                    </Link>
                ))}
                <button onClick={handleClose} className="absolute top-5 right-5 text-2xl">
                    <LiaTimesSolid />
                </button>
            </div>
        </div>
    );
};

export default Navbar;
