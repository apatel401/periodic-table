/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import * as THREE from "three"
import {  useFrame } from "@react-three/fiber"
import {  useSphere } from "@react-three/cannon"



export default function Clump({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), atoms }) {
  const [ref, api] = useSphere(() => ({ args: [1], mass: 1, angularDamping: 0.1, linearDamping: 0.65, position: [rfs(8), rfs(8), rfs(8)] }))
  const rfs = THREE.MathUtils.randFloatSpread
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
let baubleMaterial = new THREE.MeshStandardMaterial({ color: "#703AFF", roughness: 10, envMapIntensity: 10 })

  useFrame(() => {
    for (let i = 0; i < atoms; i++) {

      // Get current whereabouts of the instanced sphere
      ref.current.getMatrixAt(i, mat)
        // console.log(ref.current)
      // Normalize the position and multiply by a negative force.
      // This is enough to drive it towards the center-point.
      api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-atoms).toArray(), [0, 0, 0])
    }
  })
  return <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, atoms]} geometry={sphereGeometry} material={baubleMaterial} />
}
