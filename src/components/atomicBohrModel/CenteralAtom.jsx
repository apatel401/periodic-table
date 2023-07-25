/* eslint-disable react/prop-types */
import { Physics } from "@react-three/cannon";
import Pointer from "./Pointer";
import Clump from "./Clump";

const CenteralAtom = ({atoms}) => {
  return (
    <Physics gravity={[0, 2, 0]} iterations={10}>
      <Pointer />
      <Clump atoms={atoms} />
    </Physics>
  );
};

export default CenteralAtom;
