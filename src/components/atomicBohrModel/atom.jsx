import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Orbt(){
  const orbitRef = useRef();
  const positions = usePosition(32, 5);
  useFrame(() => {
    // atomRef.current[index].rotation.y += 0.01;
    // const elapsedTime = clockRef.current.getElapsedTime();
    // const angle = elapsedTime * 3;
    orbitRef.current.rotation.x += 0.01;
    // orbitRef.current.rotation.z += 0.01;
    // orbitRef.current.rotation.y += 0.01;
  });
  return (
    <group position={[0, 0, 0]} ref={orbitRef}>
        {positions &&
          positions.map((position, index) => {
            return <Atom key={index} index={index} position={position} />;
          })}
        {/* Atoms positioned on the orbit */}
      </group>
  )
}
export default function App() {

  

  return (
    <Canvas camera={{ position: [10, 0, 0] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* Parent object representing the orbit */}
      <Orbt />
      <OrbitControls />
    </Canvas>
  );
}

function Atom({ position, index }) {
  const atomRef = useRef([]);
  const clockRef = useRef(new THREE.Clock());

  // Rotate the atom on each frame
  useFrame(() => {
    atomRef.current[index].rotation.y += 0.001;
  });

  return (
    <mesh
      ref={(element) => (atomRef.current[index] = element)}
      position={position}
    >
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
}

export const usePosition = (numOfAtom, radius) => {
  // const radius = 5; // Radius of the orbit

  const thetaIncrement = (2 * Math.PI) / numOfAtom; // Divide the circle into four equal parts
  const phiOffset = Math.PI / 2; // Offset the points to start on the y-axis

  const positions = [];

  for (let i = 0; i < numOfAtom ; i++) {
    const theta = i * thetaIncrement;
    const phi = phiOffset;

    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(theta);

    positions.push([x, y, z]);
  }
  return positions;
};
