/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import MainAtom from "./MainAtom";
import CenteralAtom from "./CenteralAtom";

export default function BohrModel({shells, atoms}) {
  // const sphereRef = useRef();
  const meshRef = useRef();

  useFrame(() => {
    // meshRef.current.rotation.y += 0.01;
  })


  const _shells = shells.map((atoms, index)=> {
    return (
    <group key={index}>
    <mesh rotation={[0,Math.PI / 2,0]} ref={meshRef}>
      <torusGeometry args={[8 + (index*2), 0.05, 32, 100]} />
      <meshPhongMaterial color={"#ffffff"}/>
    </mesh>
    <MainAtom key={index} torusIndex={index} numOfAtoms={atoms}/>
    </group>
    )
  })
  
  return (
    <>
      {/* Parent object representing the orbit */}
      {_shells}
      <CenteralAtom atoms={atoms} />
    </>
  );
}
