"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function LiquidMetal() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Slowly rotate the entire fluid mass
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} scale={2.5}>
      <icosahedronGeometry args={[1, 64]} />
      <MeshDistortMaterial
        color="#050505"       
        emissive="#0a0a0a"    
        roughness={0.6}       // Increased roughness to kill the glare
        metalness={0.5}       // Lowered metalness to make it matte
        distort={0.4}         
        speed={1.5}           
      />
    </mesh>
  );
}

export default function FluidBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={1} color="#ffffff" />
        {/* Softened the directional light so there is no bright spotlight */}
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#444444" />
        <LiquidMetal />
      </Canvas>
    </div>
  );
}