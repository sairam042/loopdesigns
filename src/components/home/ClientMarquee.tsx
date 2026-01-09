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
      <div className="flex w-full">
        <motion.div
          className="flex gap-20 items-center min-w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          {marqueeClients.map((client, index) => (
            <div key={index} className={`w-16 h-16 relative flex items-center justify-center ${isDark ? 'brightness-0' : 'grayscale hover:grayscale-0 opacity-50 hover:opacity-100'} transition-all`}>
              <img src={client} alt={`Client ${index}`} className="max-w-full max-h-full object-contain" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ClientMarquee;
