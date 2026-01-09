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

    return (
        <div ref={ref} className="relative flex flex-col justify-center min-h-[400px] p-6 border-l border-[#ccff00]/20 pl-10 group overflow-hidden">
            {/* Large Background Number - Animated */}
            <motion.div
                style={{ scale, opacity, x }}
                className="absolute right-0 top-0 text-[200px] md:text-[300px] font-bold text-[#ccff00] leading-none select-none z-0 pointer-events-none"
            >
                {item.number}
            </motion.div>

            <div className="relative z-10">
                <span className="text-sm md:text-base tracking-[0.2em] text-gray-400 uppercase mb-2 block font-medium">
                    {item.subtitle}
                </span>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {item.title.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                    ))}
                </h3>
                <p className="text-gray-400 text-lg md:text-xl max-w-xs leading-relaxed">
                    {item.description}
                </p>
            </div>
        </div>
    );
};

const CreativeProcess = () => {
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
            className="relative min-h-screen bg-background py-32 px-4 overflow-hidden"
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
                <div className="mb-26 text-center md:text-left">
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                        Explore the <span className="italic font-serif font-light">Creative Process</span>
                    </h2>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {steps.map((step) => (
                        <StepItem key={step.id} item={step} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CreativeProcess;
