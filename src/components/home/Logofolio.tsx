import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import client1 from '../../assets/images/client-1.png';
import client2 from '../../assets/images/client-2.png';
import client3 from '../../assets/images/client-3.png';
import client4 from '../../assets/images/client-4.png';

const projects = [
    { name: "Films By Adithya", href: "#" },
    { name: "Vijay’s Kitchen", href: "#" },
    { name: "Vanthadupula", href: "#" },
    { name: "Salo Interio", href: "#" },
];

const cards = [
    { src: client1, alt: "Films By Adithya", yOffset: 20 },
    { src: client2, alt: "Vijay's Kitchen", yOffset: -30 },
    { src: client3, alt: "Vanthadupula", yOffset: 40 },
    { src: client4, alt: "Salo Interio", yOffset: -50 },
];

const Logofolio = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax effects for the cards
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

    return (
        <section ref={containerRef} className="py-24 px-4 md:px-12 bg-background relative overflow-hidden min-h-screen flex items-center">
            {/* Green Grid Background */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1a2e05_1px,transparent_1px),linear-gradient(to_bottom,#1a2e05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>

            {/* Central Green Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-[#ccff00] blur-[180px] opacity-10 pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Column: Text Content */}
                <div className="flex flex-col gap-12">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <h2 className="text-5xl md:text-7xl font-light text-white tracking-tight">Logofolio</h2>
                        <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 text-white opacity-80" />
                    </div>

                    {/* Project List */}
                    <div className="flex flex-col gap-6">
                        {projects.map((project, idx) => (
                            <a
                                key={idx}
                                href={project.href}
                                className="group flex items-center justify-between border-b border-white/20 pb-4 hover:border-[#ccff00] transition-colors"
                            >
                                <span className="text-2xl md:text-3xl text-gray-300 group-hover:text-white transition-colors font-light">
                                    {project.name}
                                </span>
                                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-[#ccff00] group-hover:border-[#ccff00] group-hover:rotate-45 transition-all duration-300">
                                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-black" />
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="mt-8">
                        <button className="px-8 py-4 bg-[#ccff00] rounded-full text-black font-medium text-xl flex items-center gap-3 hover:bg-[#bbe600] transition-colors shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                            <span className="underline decoration-1 underline-offset-4">Project In Your Mind ?</span>
                        </button>
                    </div>
                </div>

                {/* Right Column: Floating Cards */}
                <div className="grid grid-cols-2 gap-6 relative">
                    <motion.div style={{ y: y1 }} className="flex flex-col gap-6 pt-12">
                        <div className="bg-white rounded-3xl p-8 aspect-square flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-500">
                            <img src={cards[0].src} alt={cards[0].alt} className="max-w-[80%] max-h-[80%] object-contain" />
                        </div>
                        <div className="bg-white rounded-3xl p-8 aspect-square flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-500">
                            <img src={cards[1].src} alt={cards[1].alt} className="max-w-[80%] max-h-[80%] object-contain" />
                        </div>
                    </motion.div>

                    <motion.div style={{ y: y2 }} className="flex flex-col gap-6">
                        <div className="bg-white rounded-3xl p-8 aspect-square flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-500">
                            <img src={cards[2].src} alt={cards[2].alt} className="max-w-[80%] max-h-[80%] object-contain" />
                        </div>
                        <div className="bg-[#e5e5e5] rounded-3xl p-8 aspect-square flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-500">
                            <img src={cards[3].src} alt={cards[3].alt} className="max-w-[80%] max-h-[80%] object-contain" />
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default Logofolio;
