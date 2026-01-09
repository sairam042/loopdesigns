import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
import * as THREE from 'three';

const RotatingTorus = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Torus ref={meshRef} args={[3, 0.8, 16, 100]} position={[0, 0, 0]}>
      <meshStandardMaterial 
        color="#333" 
        wireframe 
        transparent 
        opacity={0.1}
        roughness={0}
        metalness={1}
      />
    </Torus>
  );
};

const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingTorus />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
