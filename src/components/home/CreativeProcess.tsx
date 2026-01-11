import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';

const steps = [
    {
        id: "01",
        number: "1",
        subtitle: "STEP 1",
        title: "Discovery Call",
        description: "We understand your exact needs. No biases."
    },
    {
        id: "02",
        number: "2",
        subtitle: "STEP 2",
        title: "Goal Setting",
        description: "Beneficial, attainable, realistic goals. For you."
    },
    {
        id: "03",
        number: "3",
        subtitle: "STEP 3",
        title: "And Success!",
        description: "Once we commit, we deliver. We strive for you."
    }
];

const StepItem = ({ item }: { item: typeof steps[0] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
    const x = useTransform(scrollYProgress, [0, 0.5], [0, 50]); // Move subtle right

    // Mobile specific animations
    const activeDotScale = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
    const activeDotColor = useTransform(scrollYProgress, [0.3, 0.5], ["#333", "#ccff00"]);

    return (
        <div ref={ref} className="relative flex flex-col justify-center min-h-[250px] md:min-h-[400px] p-6 md:p-6 pl-12 md:pl-10 border-l-0 md:border-l border-[#ccff00]/20 group overflow-hidden">

            {/* Mobile Timeline Dot */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:hidden">
                <motion.div
                    style={{ scale: activeDotScale, backgroundColor: activeDotColor }}
                    className="w-4 h-4 rounded-full shadow-[0_0_10px_#ccff00]"
                />
            </div>

            {/* Large Background Number - Animated */}
            <motion.div
                style={{ scale, opacity, x }}
                className="absolute right-0 top-0 text-[120px] md:text-[300px] font-bold text-[#ccff00] leading-none select-none z-0 pointer-events-none opacity-20 md:opacity-100"
            >
                {item.number}
            </motion.div>

            <div className="relative z-10">
                <span className="text-xs md:text-base tracking-[0.2em] text-gray-400 uppercase mb-2 block font-medium">
                    {item.subtitle}
                </span>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                    {item.title.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                    ))}
                </h3>
                <p className="text-gray-400 text-base md:text-xl max-w-xs leading-relaxed">
                    {item.description}
                </p>
            </div>
        </div>
    );
};

const CreativeProcess = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

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

    // Mobile Timeline progress (fill line)
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start center", "end center"]
    });

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-background py-20 px-4 md:py-32 overflow-hidden"
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

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-16 md:mb-26 text-center md:text-left">
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                        Explore the <span className="italic font-serif font-light">Creative Process</span>
                    </h2>
                </div>

                {/* Steps Grid */}
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8" ref={timelineRef}>

                    {/* Mobile Absolute Timeline container */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10 md:hidden rounded-full overflow-hidden">
                        <motion.div
                            style={{ scaleY: scrollYProgress, originY: 0 }}
                            className="w-full h-full bg-[#ccff00] shadow-[0_0_15px_#ccff00]"
                        />
                    </div>

                    {steps.map((step) => (
                        <StepItem key={step.id} item={step} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CreativeProcess;
