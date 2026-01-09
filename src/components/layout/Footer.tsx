
const Footer = () => {
  return (
    <footer id="contact" className="pb-12 pt-32 px-6 relative overflow-hidden">



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-gray-900 pt-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold tracking-tighter mb-6">Loop Designs</h2>
          <p className="max-w-sm text-gray-500">
            Elevating brands through clean, minimal design and robust technical architecture.
          </p>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-6">Sitemap</h3>
          <ul className="space-y-4">
            <li><a href="#work" className="hover:text-white transition-colors">Work</a></li>
            <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
            <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-6">Socials</h3>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-20 flex justify-between items-end text-xs text-gray-600 uppercase tracking-widest">
        <span>© 2024 Loop Designs. All Rights Reserved.</span>
        <span>Hyderabad, India</span>
      </div>
    </footer>
  );
};

export default Footer;
