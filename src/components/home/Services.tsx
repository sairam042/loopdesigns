import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';

const services = [
  "Strategic Branding",
  "Website Development",
  "Logo Design",
  "UI/UX Design",
  "Video Editing",
  "Photography"
];

const ServiceItem = ({ text }: { text: string }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to animations
  const width = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "105%"]); // Extend beyond 100% to fix clipping
  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]); // Subtle scale up from bottom

  return (
    <motion.div
      ref={targetRef}
      style={{ scale }}
      className="relative py-16 md:py-24 group cursor-default w-fit mx-auto"
    >
      {/* Background/Stroke Text (Inactive) */}
      <h3 className="text-5xl md:text-8xl font-bold tracking-tighter text-[#333] stroke-text px-4">
        {text}
      </h3>

      {/* Foreground/Fill Text (Active/Filling) */}
      <motion.div
        className="absolute top-16 md:top-24 left-0 overflow-hidden whitespace-nowrap text-[#fff] px-4"
        style={{ width, opacity }}
      >
        <h3 className="text-5xl md:text-8xl font-bold tracking-tighter">
          {text}
        </h3>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
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
      className="relative min-h-[200vh] bg-background group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Mouse Follow Glow (Scoped to Section via Opacity) */}
      <motion.div
        className="fixed inset-0 h-screen w-full pointer-events-none z-0 overflow-hidden transition-opacity duration-300"
        style={{ background, opacity }}
      />

      {/* Background Grid - Rendered second to be on top of glow */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1a2e05_1px,transparent_1px),linear-gradient(to_bottom,#1a2e05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none h-full w-full"></div>

      {/* Sticky Header Box */}
      <div className="sticky top-20 z-30 flex items-center justify-center pt-10 pb-10 bg-background/80 backdrop-blur-sm transition-all duration-300">
        <div className="px-12 py-4 rounded-xl">
          <h2 className="text-4xl md:text-[46px] font-bold text-[#ccff00]">
            Services We Offer
          </h2>
        </div>
      </div>

      {/* Scrollable list of services */}
      <div className="flex flex-col items-center justify-center pb-40 pt-20 relative z-20">
        <div className="flex flex-col gap-10 items-center justify-center w-full max-w-6xl px-4">
          {services.map((service, index) => (
            <ServiceItem key={index} text={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
