import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { BohrModelProps, ElectronProps, ShellProps } from '../types';

const Electron = ({ radius, speed, offset }: ElectronProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed + offset;
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(time) * radius;
      meshRef.current.position.z = Math.sin(time) * radius;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial 
        color="#3b82f6" 
        emissive="#3b82f6" 
        emissiveIntensity={1.2} 
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

const Shell = ({ radius, count, shellIndex }: ShellProps) => {
  const electrons = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => (
      <Electron
        key={i}
        radius={radius}
        speed={1 / (shellIndex + 1)}
        offset={(i * 2 * Math.PI) / count}
      />
    ));
  }, [count, radius, shellIndex]);

  return (
    <group>
      {/* Orbit Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
        <meshStandardMaterial 
          color="#94a3b8" 
          emissive="#94a3b8" 
          emissiveIntensity={0.5} 
          transparent 
          opacity={0.4} 
          side={THREE.DoubleSide} 
        />
      </mesh>

      {/* Electrons */}
      {electrons}
    </group>
  );
};

export const BohrModel = ({ shells = [], symbol }: BohrModelProps) => {
  // Dynamic scale based on the number of shells to keep the model within view
  const scale = 1 / (1 + (shells.length - 1) * 0.25);
  
  return (
    <group scale={scale}>
      {/* Nucleus */}
      <group>
        <mesh>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial 
            color="#ef4444" 
            emissive="#ef4444" 
            emissiveIntensity={0.5} 
            roughness={0.1}
            metalness={0.5}
          />
        </mesh>
        <Text
          position={[0, 0, 1.3]}
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          {symbol}
        </Text>
      </group>

      {/* Shells */}
      {shells.map((count, index) => (
        <Shell
          key={index}
          radius={(index + 1) * 3}
          count={count}
          shellIndex={index}
        />
      ))}
    </group>
  );
};
