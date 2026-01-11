import { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Facebook, ArrowRight } from 'lucide-react';
import ContactScene from './ContactScene';

const services = [
    "Performance Marketing",
    "Social Media Management",
    "Website Development",
    "Packaging Design",
    "App Development",
    "UI/UX Design",
    "Video Production",
    "Product Photography"
];

const ContactForm = () => {
    const [focusedField, setFocusedField] = useState<string | null>(null);

    return (
        <section className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center py-20">
            {/* 3D Background / Side Element */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 lg:opacity-100 lg:w-1/2 lg:right-auto lg:left-0">
                <ContactScene />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Side: Text Content (Overlaid on 3D or separate) */}
                <div className="pointer-events-none lg:pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-sm md:text-base font-medium tracking-[0.2em] text-[#ccff00] uppercase mb-4">
                            Let's Collaborate
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-none tracking-tighter mix-blend-difference">
                            Got a project? <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-white">
                                Let's talk.
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-md mb-10 leading-relaxed mix-blend-plus-lighter">
                            Break through the noise. We build brands that define culture. Tell us your vision.
                        </p>

                        <div className="flex gap-6 pointer-events-auto">
                            <SocialLink icon={<Linkedin size={20} />} />
                            <SocialLink icon={<Instagram size={20} />} />
                            <SocialLink icon={<Facebook size={20} />} />
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Glass Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden"
                >
                    {/* Subtle Gradient Glow inside card */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

                    <form className="space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Your Name"
                                id="name"
                                focusedField={focusedField}
                                setFocusedField={setFocusedField}
                            />
                            <InputField
                                label="Email Address"
                                id="email"
                                type="email"
                                focusedField={focusedField}
                                setFocusedField={setFocusedField}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Brand / Company"
                                id="brand"
                                focusedField={focusedField}
                                setFocusedField={setFocusedField}
                            />
                            <InputField
                                label="Budget (INR)"
                                id="budget"
                                focusedField={focusedField}
                                setFocusedField={setFocusedField}
                            />
                        </div>

                        {/* Services Selection */}
                        <div className="py-2">
                            <label className="block text-gray-500 text-xs uppercase tracking-wider mb-4 font-medium">I'm interested in...</label>
                            <div className="flex flex-wrap gap-2">
                                {services.map((service, i) => (
                                    <ServiceTag key={i} label={service} />
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <label
                                htmlFor="message"
                                className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'message' || true ? 'text-[#ccff00] text-xs -top-5' : 'text-gray-500 top-2'
                                    }`}
                            >
                                Tell us about the project
                            </label>
                            <textarea
                                id="message"
                                rows={2}
                                onFocus={() => setFocusedField('message')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder-transparent focus:outline-none transition-colors resize-none"
                            />
                            {/* Animated Line */}
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: focusedField === 'message' ? "100%" : "0%" }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full bg-[#ccff00]"
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-[#ccff00] text-black font-bold h-14 rounded-xl flex items-center justify-center gap-2 text-lg hover:bg-[#b3e600] transition-colors shadow-[0_0_20px_rgba(204,255,0,0.3)]"
                        >
                            Send Inquiry <ArrowRight size={20} />
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

// Sub-components for cleaner code
const InputField = ({ label, id, type = "text", focusedField, setFocusedField }: any) => {
    const isActive = focusedField === id;

    // We can also check value presence to keep label up, but for now assuming placeholder behavior
    // For a real form, you'd bind value state. 
    // Here we stick to the interaction visualization.

    return (
        <div className="relative pt-4">
            <label
                htmlFor={id}
                className={`absolute left-0 transition-all duration-300 pointer-events-none ${isActive ? 'text-[#ccff00] text-xs top-0' : 'text-gray-500 text-sm top-5'
                    }`}
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                onFocus={() => setFocusedField(id)}
                onBlur={(e) => !e.target.value && setFocusedField(null)} // keep focused style if has value? simple version for now
                onChange={(e) => e.target.value && setFocusedField(id)} // Ensure label stays up if typing
                className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none transition-colors"
            />
            {/* Animated Line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-[#ccff00]"
                />
            </div>
        </div>
    )
}

const ServiceTag = ({ label }: { label: string }) => {
    const [selected, setSelected] = useState(false);
    return (
        <motion.button
            onClick={(e) => { e.preventDefault(); setSelected(!selected); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium border transition-all duration-300 ${selected
                ? 'bg-[#ccff00] text-black border-[#ccff00]'
                : 'bg-transparent text-gray-400 border-white/20 hover:border-white hover:text-white'
                }`}
        >
            {label}
        </motion.button>
    )
}

const SocialLink = ({ icon }: { icon: React.ReactNode }) => (
    <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] transition-all duration-300">
        {icon}
    </a>
)

export default ContactForm;
