import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useAnimationContext } from '../useAnimations'

export function N_Creep_Black_Dragon(props, {anim='idle'}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('http://localhost:3001/assets/models/n_creep_black_dragon/n_creep_black_dragon.glb')
  const { actions } = useAnimations(animations, group)
  const { setActions } = useAnimationContext();

    useEffect(() => {
              setActions('N_Creep_Black_Dragon', actions)
              actions[anim].play();
          },[anim])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="n_creep_black_dragonvmdl_c">
        <group
          name="modelscreepsneutral_creepsn_creep_black_dragonn_creep_black_dragonvmdl_c"
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.025}>
          <primitive object={nodes.root} />
        </group>
        <skinnedMesh
          name="modelscreepsneutral_creepsn_creep_black_dragonn_creep_black_dragonvmdl_cn_creep_black_dragon_model"
          geometry={
            nodes
              .modelscreepsneutral_creepsn_creep_black_dragonn_creep_black_dragonvmdl_cn_creep_black_dragon_model
              .geometry
          }
          material={materials.neutral_black_dragon}
          skeleton={
            nodes
              .modelscreepsneutral_creepsn_creep_black_dragonn_creep_black_dragonvmdl_cn_creep_black_dragon_model
              .skeleton
          }
        />
      </group>
    </group>
  )
}

export default N_Creep_Black_Dragon;