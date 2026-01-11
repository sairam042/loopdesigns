import { useRef, useLayoutEffect, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera, MeshTransmissionMaterial, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// --- CONSTANTS ---
const THEME = {
    lime: '#ccff00',
    dark: '#0a0a0a',
    white: '#ffffff',
    glass: '#ffffff'
};

// --- SCENE COMPONENT ---
const Scene = () => {
    const { camera, viewport } = useThree();
    const groupRef = useRef<THREE.Group>(null);
    const mainRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const debrisRef = useRef<THREE.Group>(null);

    const isMobile = viewport.width < 5;
    const scaleFactor = isMobile ? 0.6 : 1;

    useLayoutEffect(() => {
        if (!groupRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#cinematic-wrapper",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5,
            }
        });

        // 1. HERO -> PHILOSOPHY (Deconstruct)
        tl.to(mainRef.current!.rotation, { x: 1, y: 0.5, duration: 2 }, 0)
            .to(camera.position, { z: 10, duration: 2 }, 0);

        // 2. PHILOSOPHY -> SERVICES (Morph & Reveal)
        tl.to(mainRef.current!.rotation, { y: Math.PI * 2, duration: 2 }, 2)
            .to(mainRef.current!.position, { x: isMobile ? 0 : 3, duration: 2 }, 2) // Move aside
            .to(ringRef.current!.scale, { x: 1, y: 1, z: 1, duration: 2 }, 2) // Reveal Ring
            .to(ringRef.current!.rotation, { x: 0.5, y: 0.5, duration: 2 }, 2);

        // 3. SERVICES -> SHOWCASE (Fly Through)
        tl.to(camera.position, { z: 2, duration: 2, ease: "power2.in" }, 4) // Zoom in
            .to(groupRef.current!.rotation, { z: -0.5, duration: 2 }, 4)
            .to(ringRef.current!.position, { z: 5, duration: 2 }, 4); // Fly past ring

        // 4. SHOWCASE -> CTA (Settle)
        tl.to(camera.position, { z: 14, x: 0, y: 0, duration: 2, ease: "power2.out" }, 6) // Pull back
            .to(mainRef.current!.position, { x: 0, y: 0, z: 0, duration: 2 }, 6) // Center main
            .to(ringRef.current!.scale, { x: 0, y: 0, z: 0, duration: 1 }, 6) // Hide ring
            .to(mainRef.current!.rotation, { x: 0, y: 0, z: 0, duration: 2 }, 6); // Reset rot

    }, [isMobile]);

    useFrame((state) => {
        if (!mainRef.current) return;
        // Subtle floating independent of scroll
        mainRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.001;

        // Debris drift
        if (debrisRef.current) {
            debrisRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <group ref={groupRef} scale={scaleFactor}>
            <Environment preset="studio" />
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} color={THEME.lime} />
            <pointLight position={[-10, -10, -10]} intensity={1} color="blue" />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* HERO OBJECT: Intricate Knot */}
                <mesh ref={mainRef}>
                    <torusKnotGeometry args={[1.2, 0.4, 300, 20, 2, 3]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={8}
                        resolution={512}
                        thickness={0.25}
                        roughness={0.2}
                        anisotropy={1}
                        chromaticAberration={0.06}
                        color={THEME.white}
                    />
                </mesh>

                {/* SECONDARY OBJECT: The Services Ring (Initially Hidden) */}
                <mesh ref={ringRef} scale={[0, 0, 0]}>
                    <torusGeometry args={[3, 0.02, 16, 100]} />
                    <meshStandardMaterial
                        color={THEME.lime}
                        emissive={THEME.lime}
                        emissiveIntensity={2}
                        toneMapped={false}
                    />
                </mesh>
            </Float>

            {/* ATMOSPHERE */}
            <group ref={debrisRef}>
                <Sparkles count={50} scale={10} size={2} speed={0.4} opacity={0.5} color={THEME.white} />
                <Sparkles count={20} scale={12} size={4} speed={0.2} opacity={0.8} color={THEME.lime} />
            </group>
        </group>
    );
};

// --- TEXT COMPONENT ---
const OverlayText = ({
    title,
    subtitle,
    align = "center",
    highlight = false
}: { title: string, subtitle?: string, align?: "left" | "right" | "center", highlight?: boolean }) => {

    const alignClass = align === "left" ? "items-start text-left pl-10 md:pl-20" :
        align === "right" ? "items-end text-right pr-10 md:pr-20" :
            "items-center text-center";

    return (
        <div className={`h-screen w-full flex flex-col justify-center ${alignClass} p-6 pointer-events-none`}>
            <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: false, margin: "-10%" }}
                className={`text-6xl md:text-8xl font-bold tracking-tighter mb-4 leading-none ${highlight ? 'text-[#ccff00]' : 'text-white'}`}
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: false }}
                    className="text-xl md:text-2xl text-gray-400 font-light max-w-xl"
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    )
}

// --- MAIN PAGE ---
const Cinematic3D = () => {

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easeOutExpo
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return (
        <div id="cinematic-wrapper" className="relative bg-[#0a0a0a] w-full text-white">

            {/* STICKY 3D BACKGROUND */}
            <div className="h-screen w-full sticky top-0 overflow-hidden z-0">
                <Canvas gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}>
                    <PerspectiveCamera makeDefault position={[0, 0, 12]} />
                    <Scene />
                </Canvas>

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_120%)] pointer-events-none mix-blend-multiply" />
            </div>

            {/* SCROLL CONTENT (Z-Index above canvas) */}
            <div className="relative z-10 -mt-[100vh]">

                {/* 1. HERO */}
                <OverlayText
                    title="Infinite Loop"
                    subtitle="Where design defies gravity."
                    highlight
                />

                {/* 2. PHILOSOPHY */}
                <OverlayText
                    title="Philosophy"
                    subtitle="We deconstruct complexity into pure, elemental forms. Beauty found in truth."
                    align="right"
                />

                {/* 3. SERVICES */}
                <OverlayText
                    title="Digital Craft"
                    subtitle="From immersive 3D webs to brand systems. We build what's next."
                    align="left"
                    highlight
                />

                {/* 4. SHOWCASE */}
                <OverlayText
                    title="Impact"
                    subtitle="Experiences that leave a dent in the digital universe."
                />

                {/* 5. CTA */}
                <div className="h-screen w-full flex flex-col justify-center items-center pointer-events-auto">
                    <motion.h2
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="text-7xl md:text-9xl font-bold tracking-tighter mb-12 text-center"
                    >
                        Ready?
                    </motion.h2>
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#ffffff" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-12 py-4 bg-[#ccff00] text-black rounded-full font-bold text-xl tracking-wide transition-colors duration-300"
                    >
                        Start Your Project
                    </motion.button>
                </div>

            </div>
        </div>
    );
};

export default Cinematic3D;
