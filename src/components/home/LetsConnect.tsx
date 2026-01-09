import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowUpRight, MessageCircle, Hand, Download } from 'lucide-react';
import logo from '../../assets/images/client-1.png';


const LetsConnect = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse tracking for dynamic glow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const opacity = useMotionValue(0);

    function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
        mouseX.set(clientX);
        mouseY.set(clientY);
        opacity.set(1);
    }

    function handleMouseLeave() {
        opacity.set(0);
    }

    // Create a radial gradient that follows the mouse
    const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(204, 255, 0, 0.15), transparent 80%)`;

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-background flex flex-col items-center justify-center py-20 px-4 group overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Dynamic Mouse Follow Glow (Scoped to Section via Opacity) */}
            <motion.div
                className="fixed inset-0 h-screen w-full pointer-events-none z-0 overflow-hidden transition-opacity duration-300"
                style={{ background, opacity }}
            />

            {/* Background Grid */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1a2e05_1px,transparent_1px),linear-gradient(to_bottom,#1a2e05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none h-full w-full"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-start mb-10">
                    <h2 className="text-6xl font-bold tracking-tighter text-white flex items-start gap-4">
                        Lets Connect <ArrowUpRight className="w-12 h-12 md:w-16 md:h-16 text-[#ccff00]" />
                    </h2>
                    <div className="hidden md:block">
                        {/* Owl Logo Placeholder - Replacing with a simple icon representation if actual svg not available */}
                        <img src={logo} alt="logo" className='w-20' />
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">

                    {/* Card 1 */}
                    <div className="bg-[#1a2e05]/40 backdrop-blur-sm border border-[#ccff00]/20 rounded-3xl p-10 flex flex-col items-center text-center justify-center min-h-[400px] relative group/card transition-all hover:bg-[#1a2e05]/60 hover:border-[#ccff00]/40 z-30">
                        <div className="mb-6 text-white">
                            <Hand className="w-20 h-20 text-white" />
                        </div>
                        <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed">
                            We appreciate your consideration and look forward to crafting your vision with us
                        </p>

                        <div className="absolute -bottom-28 -right-[-38px] hidden md:block text-white opacity-80 z-40">
                            <svg width="140" height="140" viewBox="0 0 100 100" fill="none" className="transform rotate-6">
                                {/* Curly loop path */}
                                <path d="M 45 0 C 45 0 25 25 25 40 C 25 55 45 55 45 40 C 45 25 25 25 25 50 C 25 80 80 80 95 85" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                                {/* Arrowhead */}
                                <path d="M 85 75 L 95 85 L 88 95" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#1a2e05]/40 backdrop-blur-sm border border-[#ccff00]/20 rounded-3xl p-10 flex flex-col items-center text-center justify-center min-h-[400px] hover:bg-[#1a2e05]/60 hover:border-[#ccff00]/40 transition-all">
                        <div className="mb-6 relative">
                            <h3 className="text-6xl font-black text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ WebkitTextStroke: '2px #1a1a1a' }}>
                                THANK<br />YOU
                            </h3>
                        </div>
                        <div className="mb-4">
                            <span className="text-6xl text-white">*</span>
                        </div>
                        <p className="text-xl md:text-2xl text-gray-200">
                            Let's bring your ideas to life!
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#1a2e05]/40 backdrop-blur-sm border border-[#ccff00]/20 rounded-3xl p-10 flex flex-col items-center text-center justify-center min-h-[400px] hover:bg-[#1a2e05]/60 hover:border-[#ccff00]/40 transition-all">
                        <div className="mb-6 bg-green-500 rounded-full p-4">
                            <MessageCircle className="w-12 h-12 text-white fill-white" />
                        </div>
                        <p className="text-xl md:text-2xl text-gray-200 underline decoration-[#ccff00] underline-offset-4 cursor-pointer hover:text-white transition-colors">
                            Connect us on whats app to start a conversation
                        </p>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center relative">
                    <button className="bg-[#ccff00] text-black text-xl md:text-2xl px-12 py-6 rounded-full font-bold hover:scale-105 transition-transform duration-300 flex items-center gap-4 shadow-[0_0_40px_rgba(204,255,0,0.3)]">
                        Download Our Proposal For Free <Download className="w-8 h-8" />
                    </button>
                </div>

            </div>
        </section>
    );
};

export default LetsConnect;
