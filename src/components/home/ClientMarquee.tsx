// import React from 'react';
import { motion } from 'framer-motion';
import client1 from '../../assets/images/client-1.png';
import client2 from '../../assets/images/client-2.png';
import client3 from '../../assets/images/client-3.png';
import client4 from '../../assets/images/client-4.png';

const clients = [client1, client2, client3, client4];

// Duplicate for infinite scroll
const marqueeClients = [...clients, ...clients, ...clients, ...clients];

const ClientMarquee = ({ variant = 'light' }: { variant?: 'light' | 'dark' }) => {
  const isDark = variant === 'dark';

  return (
    <div className={`overflow-hidden ${isDark ? 'text-black' : 'bg-background py-20'}`}>
      {!isDark && (
        <div className="mb-10 px-6">
          <p className="text-sm uppercase tracking-widest text-gray-500">Selected Clients</p>
        </div>
      )}
      <div
        className="flex w-full overflow-hidden select-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="flex gap-8 md:gap-20 pr-8 md:pr-20 items-center min-w-max flex-shrink-0 will-change-transform"
        >
          {marqueeClients.map((client, index) => (
            <div key={index} className={`h-12 md:h-16 w-auto relative flex items-center justify-center ${isDark ? 'brightness-0' : 'grayscale hover:grayscale-0 opacity-50 hover:opacity-100'} transition-all`}>
              <img src={client} alt={`Client ${index}`} className="h-full w-auto object-contain" />
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="flex gap-8 md:gap-20 pr-8 md:pr-20 items-center min-w-max flex-shrink-0 will-change-transform"
        >
          {marqueeClients.map((client, index) => (
            <div key={`dup-${index}`} className={`h-12 md:h-16 w-auto relative flex items-center justify-center ${isDark ? 'brightness-0' : 'grayscale hover:grayscale-0 opacity-50 hover:opacity-100'} transition-all`}>
              <img src={client} alt={`Client ${index}`} className="h-full w-auto object-contain" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ClientMarquee;
