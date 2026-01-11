import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/images/client-2.png';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        // delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-black/70 border-b border-white/5 text-white flex justify-between items-center transition-all duration-300">
        <img
          src={logo}
          alt="Client Logo"
          className="invert w-24 relative z-50"
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
          <a href="#work" className="hover:opacity-70 transition-opacity">Work</a>
          <a href="#services" className="hover:opacity-70 transition-opacity">Services</a>
          <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
          <a href="#contact" className="hover:opacity-70 transition-opacity">Contact</a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white z-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex items-center justify-center md:hidden"
          >
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-8 text-center"
            >
              {['Work', 'Services', 'About', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  variants={itemVariants}
                  className="text-4xl font-bold tracking-tighter text-white hover:text-[#ccff00] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
