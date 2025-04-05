import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useAnimationContext } from '../useAnimations'

export function N_Creep_Black_Drake(props, {anim='idle'}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('http://localhost:3001/assets/models/n_creep_black_drake/n_creep_black_drake.glb')
  const { actions } = useAnimations(animations, group)
  const { setActions } = useAnimationContext();

    useEffect(() => {
              setActions('N_Creep_Black_Drake', actions)
              actions[anim].play();
          },[anim])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="n_creep_black_drakevmdl_c">
        <group
          name="modelscreepsneutral_creepsn_creep_black_draken_creep_black_drakevmdl_c"
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.025}>
          <primitive object={nodes.root} />
        </group>
        <skinnedMesh
          name="modelscreepsneutral_creepsn_creep_black_draken_creep_black_drakevmdl_cn_creep_black_drake_model"
          geometry={
            nodes
              .modelscreepsneutral_creepsn_creep_black_draken_creep_black_drakevmdl_cn_creep_black_drake_model
              .geometry
          }
          material={materials.neutral_black_drake}
          skeleton={
            nodes
              .modelscreepsneutral_creepsn_creep_black_draken_creep_black_drakevmdl_cn_creep_black_drake_model
              .skeleton
          }
        />
      </group>
    </group>
  )
}

export default N_Creep_Black_Drake;
