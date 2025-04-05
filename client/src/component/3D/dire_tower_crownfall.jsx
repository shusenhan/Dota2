import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Dire_Tower_Crownfall(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('http://localhost:3001/assets/models/dire_tower_crownfall/dire_tower_crownfall.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions['idle'].play();
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="dire_tower_crownfallvmdl_c">
        <group
          name="dire_tower_crownfallvmdl_c_1"
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.025}>
          <primitive object={nodes.crownfall_tower_00_JNT} />
        </group>
        <group name="dire_tower_crownfallvmdl_cdire_tower_crownfall_model">
          <skinnedMesh
            name="dire_tower_crownfallvmdl_cdire_tower_crownfall_model_1"
            geometry={nodes.dire_tower_crownfallvmdl_cdire_tower_crownfall_model_1.geometry}
            material={materials.crownfall_dire_pedastal_tower}
            skeleton={nodes.dire_tower_crownfallvmdl_cdire_tower_crownfall_model_1.skeleton}
          />
          <skinnedMesh
            name="dire_tower_crownfallvmdl_cdire_tower_crownfall_model_2"
            geometry={nodes.dire_tower_crownfallvmdl_cdire_tower_crownfall_model_2.geometry}
            material={materials.crownfall_dire_screeauk_tower}
            skeleton={nodes.dire_tower_crownfallvmdl_cdire_tower_crownfall_model_2.skeleton}
          />
        </group>
      </group>
    </group>
  )
}

// useGLTF.preload('/dire_tower_crownfall.glb')