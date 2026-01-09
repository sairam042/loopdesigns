// import { useRef } from 'react';
import { motion } from 'framer-motion';
import ClientMarquee from './ClientMarquee';
import client1 from '../../assets/images/client-1.png';

const Hero = () => {
  return (
    <section className="flex items-center justify-center px-4 py-8 relative overflow-hidden bg-background h-[90vh] mt-20">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25"></div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[95vw] h-full bg-black rounded-[2.5rem] border border-neutral-800 overflow-hidden shadow-2xl flex flex-col justify-between"
      >
        <div className="p-10 md:p-16 flex flex-col items-center text-center flex-grow justify-center">
          {/* Logo / Brand Name */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            {/* Replace with actual logo logic later if needed */}
            <h2 className="text-xl font-bold tracking-tighter uppercase font-mono flex items-center justify-center">
              L<img src={client1} alt="Loop Logo" className="h-6 mx-0.5" />p Designs
            </h2>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-12">
            <span className="block text-white">We craft brands.</span>
            <span className="block relative inline-block">
              <span className="text-white">Brands drive </span>
              {/* Animated 'growth.' word - Bouncy Fall */}
              <div className="relative inline-block overflow-hidden align-bottom h-[1.1em]">
                <motion.span
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 10,
                    mass: 0.8,
                    delay: 0.5
                  }}
                  className="inline-block text-[#ccff00]"
                >
                  growth.
                </motion.span>
              </div>
            </span>
          </h1>

          {/* Subtext */}
          <p className="max-w-2xl text-base text-gray-400 leading-relaxed mx-auto">
            With expertise in digital strategy and design, we build exceptional visual identities and technical solutions that elevate your business.
          </p>
        </div>

        {/* Lime Green Footer with Marquee */}
        <div className="bg-[#ccff00] py-6 w-full">
          <ClientMarquee variant="dark" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
