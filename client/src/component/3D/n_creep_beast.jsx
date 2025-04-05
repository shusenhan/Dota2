import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useAnimationContext } from '../useAnimations'

export function N_Creep_Beast(props, {anim='idle'}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('http://localhost:3001/assets/models/n_creep_beast/n_creep_beast.glb')
  const { actions } = useAnimations(animations, group)
  const { setActions } = useAnimationContext();

  useEffect(() => {
          setActions('N_Creep_Beast', actions)
          actions[anim].play();
      },[anim])
      
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="n_creep_beastvmdl_c">
        <group
          name="modelscreepsneutral_creepsn_creep_beastn_creep_beastvmdl_c"
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.025}>
          <primitive object={nodes.root} />
        </group>
        <skinnedMesh
          name="modelscreepsneutral_creepsn_creep_beastn_creep_beastvmdl_cn_creep_beast_model"
          geometry={
            nodes.modelscreepsneutral_creepsn_creep_beastn_creep_beastvmdl_cn_creep_beast_model
              .geometry
          }
          material={materials.neutral_beast}
          skeleton={
            nodes.modelscreepsneutral_creepsn_creep_beastn_creep_beastvmdl_cn_creep_beast_model
              .skeleton
          }
        />
      </group>
    </group>
  )
}

export default N_Creep_Beast;