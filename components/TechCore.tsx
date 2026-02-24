"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Wireframe, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function CoreShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial 
          color="#8b5cf6" 
          wireframe={true} 
          distort={0.4} 
          speed={2} 
          emissive="#4c1d95" 
          emissiveIntensity={2} 
        />
      </mesh>
    </Float>
  );
}

export default function TechCore() {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <CoreShape />
      </Canvas>
    </div>
  );
}