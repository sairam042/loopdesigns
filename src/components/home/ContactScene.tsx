import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Environment, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const AnimatedShape = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        // Rotate the shape
        meshRef.current.rotation.x = time * 0.1;
        meshRef.current.rotation.y = time * 0.2;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={1.8}>
                <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                <MeshDistortMaterial
                    color="#ccff00"
                    attach="material"
                    distort={0.4} // Strength of distortion
                    speed={2} // Speed of distortion
                    roughness={0.2}
                    metalness={0.8}
                    emissive="#1a2e05"
                    emissiveIntensity={0.5}
                />
            </mesh>
        </Float>
    );
};

const ContactScene = () => {
    return (
        <div className="absolute inset-0 w-full h-full">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <Environment preset="city" />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ccff00" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />

                <AnimatedShape />
            </Canvas>
        </div>
    );
};

export default ContactScene;
