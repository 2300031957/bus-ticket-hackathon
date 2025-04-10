import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCopy, FaCheck } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Tooltip } from 'react-tooltip';
import Save from "../../../assets/save.png";
import Confetti from 'react-confetti';

const Offer = () => {
    const [copiedCode, setCopiedCode] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code)
            .then(() => {
                setCopiedCode(code);
                setShowConfetti(true);
                
                toast.success(`Code ${code} Copied!`, {
                    icon: "✅",
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                        fontSize: "16px"
                    },
                    duration: 2000,
                });

                setTimeout(() => {
                    setCopiedCode(null);
                    setShowConfetti(false);
                }, 5000);
            })
            .catch(() => {
                toast.error("Failed to copy!", { icon: "❌" });
            });
    };

    const offers = [
        { title: "Get 15% off on your first booking", code: "LIKITH01", description: "Use code LIKITH05 and get 15% off on your first booking" },
        { title: "Get 10% off on your referrals", code: "SEERAT29", description: "Use code SEERAT29 and invite your friends to get 10% off" },
        { title: "Get 5% off on your second booking", code: "SUSHANTH03", description: "Use code SUSHANTH03 and get 5% off on your second booking" },
        { title: "Get 5% off on your second booking", code: "ABHIJNA31", description: "Use code ABHIJNA31 and get 5% off on your second booking" }
    ];

    return (
        <div className='w-full lg:px-28 md:px-16 sm:px-7 px-4 my-[8ch] relative'>
            {/* Toast Notification */}
            <Toaster position="top-center" reverseOrder={false} />

            {/* Confetti 🎉 */}
            {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={100} />}

            <div className="w-full items-center flex justify-between">
                <h1 className="text-2xl font-medium mb-6">Special Offers</h1>
                <Link to={"/offer"} className='text-violet-600'>View All</Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {offers.map((offer, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(144, 39, 255, 0.2)" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full h-auto rounded-xl bg-zinc-200/30 dark:bg-zinc-800/20 p-8 flex items-center gap-x-3 shadow-md cursor-pointer transition-all"
                    >
                        <img src={Save} alt="Save Image" className="w-52 aspect-[2/1] object-contain object-center" />
                        <div className="flex flex-1 flex-col space-y-5">
                            <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                                {offer.title}
                            </h1>

                            <div className="flex items-center gap-x-5">
                                <motion.div
                                    initial={{ scale: 1 }}
                                    animate={copiedCode === offer.code ? { scale: 1.1 } : {}}
                                    transition={{ duration: 0.2 }}
                                    className="w-fit border border-dashed px-4 py-1 border-neutral-300 dark:border-neutral-700 bg-violet-500/10 dark:bg-violet-800/5 rounded-md p-3"
                                >
                                    <span className="text-violet-600">{offer.code}</span>
                                </motion.div>

                                {/* Tooltip for Copy Button */}
                                <Tooltip id={`copy-tooltip-${index}`} place="top" effect="solid">
                                    {copiedCode === offer.code ? "Copied!" : "Copy Code"}
                                </Tooltip>

                                {/* Copy Button with Tooltip & Animated Icon */}
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    className="text-xl text-violet-600"
                                    onClick={() => handleCopy(offer.code)}
                                    data-tooltip-id={`copy-tooltip-${index}`}
                                >
                                    {copiedCode === offer.code ? <FaCheck className="text-green-500" /> : <FaCopy />}
                                </motion.button>
                            </div>

                            <p className="text-sm text-neutral-400 dark:text-neutral-600 font-normal">
                                {offer.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Offer;