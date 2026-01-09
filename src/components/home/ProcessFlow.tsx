import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Lightbulb, Atom, Battery, Sprout } from 'lucide-react';

const steps = [
    { id: 1, title: 'Discover', icon: Search, color: 'lime', height: 'h-40' },
    { id: 2, title: 'Define', icon: Lightbulb, color: 'white', height: 'h-56' },
    { id: 3, title: 'Design', icon: Atom, color: 'lime', height: 'h-72' },
    { id: 4, title: 'Develop', icon: Battery, color: 'white', height: 'h-56' },
    { id: 5, title: 'Deliver', icon: Sprout, color: 'lime', height: 'h-40' },
];

const ProcessFlow = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

    return (
        <section ref={containerRef} className="py-20 px-4 bg-background relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
            {/* Green Grid Background */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1a2e05_1px,transparent_1px),linear-gradient(to_bottom,#1a2e05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40"></div>

            {/* Top Green Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-[#ccff00] blur-[150px] opacity-20 pointer-events-none"></div>

            {/* Top Line & Glow */}
            <div className="relative w-full max-w-4xl mx-auto mb-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1 bg-[#ccff00] blur-sm opacity-50"></div>
                <div className="w-full h-[1px] bg-[#ccff00] relative z-10"></div>
            </div>

            <motion.div
                style={{ opacity, y }}
                className="relative z-10 flex items-start justify-center gap-0 max-w-6xl mx-auto w-full perspective-[1000px]"
            >
                {steps.map((step, index) => {
                    const isLime = step.color === 'lime';
                    const Icon = step.icon;

                    return (
                        <div key={step.id} className="flex flex-col items-center flex-1 group">
                            {/* Card */}
                            <motion.div
                                initial={{ backgroundColor: '#1a1a1a' }}
                                whileInView={{ backgroundColor: isLime ? '#ccff00' : '#e5e5e5' }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`w-full ${step.height} flex flex-col items-center justify-center gap-4 relative z-20 transition-all duration-500 shadow-2xl border-b-4 ${isLime ? 'border-[#aadd00]' : 'border-gray-300'}`}
                            >
                                <Icon
                                    strokeWidth={1.5}
                                    className={`w-8 h-8 ${isLime ? 'text-black' : 'text-black'} opacity-80 group-hover:scale-110 transition-transform`}
                                />
                                <span className={`text-lg font-medium tracking-wide ${isLime ? 'text-black' : 'text-black'}`}>
                                    {step.title}
                                </span>

                                {/* 3D Bottom Face Effect */}
                                <div className={`absolute -bottom-4 left-0 w-full h-4 origin-top ${isLime ? 'bg-[#99cc00]' : 'bg-[#cccccc]'} skew-x-12 opacity-50`}></div>
                            </motion.div>

                            {/* 3D Growing Path */}
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                whileInView={{ height: '30vh', opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className={`w-[140%] relative origin-top ${isLime ? 'bg-gradient-to-b from-[#ccff00] to-[transparent]' : 'bg-gradient-to-b from-white to-[transparent]'}`}
                                style={{
                                    clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0% 100%)', // Spreading outwards
                                    zIndex: 10
                                }}
                            >
                                {/* Inner shadow for depth */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>
                            </motion.div>
                        </div>
                    );
                })}
            </motion.div>
        </section>
    );
};

export default ProcessFlow;
