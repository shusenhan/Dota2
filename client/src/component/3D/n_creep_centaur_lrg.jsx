import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useAnimationContext } from '../useAnimations'

export function N_Creep_Centaur_Lrg(props, {anim='idle'}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('http://localhost:3001/assets/models/n_creep_centaur_lrg/n_creep_centaur_lrg.glb')
  const { actions } = useAnimations(animations, group)
  const { setActions } = useAnimationContext();

  useEffect(() => {
                setActions('N_Creep_Centaur_Lrg', actions)
                actions[anim].play();
            },[anim])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="n_creep_centaur_lrgvmdl_c">
        <group
          name="modelscreepsneutral_creepsn_creep_centaur_lrgn_creep_centaur_lrgvmdl_c"
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.025}>
          <primitive object={nodes.Root_0} />
        </group>
        <skinnedMesh
          name="modelscreepsneutral_creepsn_creep_centaur_lrgn_creep_centaur_lrgvmdl_cn_creep_centaur_lrg_model"
          geometry={
            nodes
              .modelscreepsneutral_creepsn_creep_centaur_lrgn_creep_centaur_lrgvmdl_cn_creep_centaur_lrg_model
              .geometry
          }
          material={materials.n_creep_centaur_conqueror}
          skeleton={
            nodes
              .modelscreepsneutral_creepsn_creep_centaur_lrgn_creep_centaur_lrgvmdl_cn_creep_centaur_lrg_model
              .skeleton
          }
        />
      </group>
    </group>
  )
}

export default N_Creep_Centaur_Lrg;