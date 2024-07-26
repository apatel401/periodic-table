import BohrModel from "./BohrModel";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useContext } from "react";
import { PeriodicTableContext } from "../Provider";

const AtomicBohrModel = () => {
    const {currentElement} = useContext(PeriodicTableContext)
    return(
        <Canvas camera={{ position: [30, 5, 5] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <BohrModel
          atoms={currentElement.number}
          shells={currentElement.shells}
        />
        <OrbitControls enableZoom={false} />
      </Canvas>
    )
 }

 export default AtomicBohrModel