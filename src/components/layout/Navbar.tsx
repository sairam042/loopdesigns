// import React from 'react';
import logo from '../../assets/images/client-2.png';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-black/70 border-b border-white/5 text-white flex justify-between items-center transition-all duration-300">
      {/* <div className="text-2xl font-bold tracking-tighter">Loop Designs</div> */}
      <img
        src={logo}
        alt="Client Logo"
        className="invert w-24"
      />
      <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
        <a href="#work" className="hover:opacity-70 transition-opacity">Work</a>
        <a href="#services" className="hover:opacity-70 transition-opacity">Services</a>
        <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
        <a href="#contact" className="hover:opacity-70 transition-opacity">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
