import React from "react";
import Bus2 from "../../../assets/bus5.png";
import { motion } from "framer-motion";

const Hero = () => {
  const imageVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: "3%", opacity: 1, transition: { duration: 3, ease: "easeInOut" } },
    exit: { x: "100%", opacity: 0 } // Smooth exit transition
    
  };

  return (
    <div className="w-full h-[calc(100vh-8ch)] lg:ps-28 md:ps-16 sm:ps-7 ps-4 mt-[8ch] flex items-center justify-center flex-col hero relative">
      <div className="flex-1 w-full flex items-stretch justify-between gap-12 pb-10"></div>

      {/* Left Side Content */}
      <motion.div
        className="absolute left-10 top-1 transform -translate-y-1/2 lg:left-28 md:left-16 sm:left-7 left-4 w-[35%] h-auto rounded-md flex justify-center flex-col space-y-14 max-w-[90%] text-center lg:text-left"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "linear", delay: 0.2 }}
      >
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "linear", delay: 0.2 }}
        >
          <motion.h1
            className="text-6xl lg:text-7xl font-bold text-neutral-40 leading-[1.15]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: "linear", delay: 0.4 }}
          >
            Reserve Your <span className="text-violet-400 tracking-wider">Bus Tickets</span> <br />
            with <span className="text-red-500 tracking-wider">Ease</span>
          </motion.h1>

          <motion.p
            className="text-lg font-normal text-neutral-300 line-clamp-3 text-ellipsis"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: "linear", delay: 0.6 }}
          >
            Find the best bus deals and book your bus tickets online with ease. We offer a wide range of bus services across the country.
          </motion.p>
        </motion.div>

        {/* Call-to-Action Button with Hover Effect */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-fit bg-violet-700 hover:bg-violet-800 text-neutral-50 font-medium py-3 px-6 rounded-md ease-in-out duration-300"
        >
          Reserve Your Seat Now
        </motion.button>
      </motion.div>

      {/* Bus Image Section */}
      <div className="w-[70%] h-full rounded-md flex items-end justify-end absolute top-0 -right-48">
        <motion.img
          className="w-full aspect-[4/2] object-contain"
          src={Bus2}
          alt="Bus Image"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={imageVariants}
        />
      </div>
    </div>
  );
};

export default Hero;
