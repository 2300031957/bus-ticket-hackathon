import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Bus1 from "../../../assets/bus1.png";
import Bus2 from "../../../assets/bus6.png";
import Bus3 from "../../../assets/bus9.png";

const Category = () => {
    return (
        <div className='w-full lg:px-28 md:px-16 sm:px-7 px-4 my-[8ch]'>
            {/* Header */}
            <motion.div 
                className="w-full flex items-center justify-between"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <h1 className="text-2xl font-medium mb-6">Category</h1>
                <Link to={"/bus"} className='text-violet-600 hover:underline'>
                    View All
                </Link>
            </motion.div>

            {/* Bus Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                    { img: Bus1, title: "Private Bus" },
                    { img: Bus2, title: "Tourist Bus" },
                    { img: Bus3, title: "Government Bus" }
                ].map((bus, index) => (
                    <Link key={index} to={"/bus"} className='relative block rounded-xl overflow-hidden group'>
                        <motion.img
                            src={bus.img}
                            alt={`${bus.title} Image`}
                            className="w-full aspect-video object-contain"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                        <motion.div 
                            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-tr dark:from-neutral-950/80 dark:to-neutral-850/60 from-neutral-400/80 to-neutral-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            whileHover={{ opacity: 1 }}
                        >
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                                {bus.title}
                            </h2>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Category;
