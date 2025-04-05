import React, { useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

export function Tree({position, ...props}) {
  const { nodes, materials } = useGLTF('http://localhost:3001/assets/models/tree/dire_tree006.glb')
  console.log(position)

  const model = (
    <group>
      <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]} scale={0.025}>
        <primitive object={nodes.joint1} />
      </group>
      <skinnedMesh
        geometry={nodes.dire_tree006vmdl_cdire_tree006_model.geometry}
        material={materials.tree_oak_leaves_00}
        skeleton={nodes.dire_tree006vmdl_cdire_tree006_model.skeleton}
      />
    </group>
  );
  
  return (
    <group position={position} {...props} dispose={null}>
      {model}
    </group>
  )
}

export default Tree;
