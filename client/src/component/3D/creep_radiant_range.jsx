import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useAnimationContext } from '../useAnimations'

function Radiant_Ranged(props, {anim='idle'}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('http://localhost:3001/assets/models/radiant_ranged/radiant_ranged.glb')
  const { actions } = useAnimations(animations, group)
  const { setActions } = useAnimationContext();

  useEffect(() => {
             setActions('N_Creep_Beast', actions)
             actions[anim].play();
         },[anim])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="radiant_rangedvmdl_c">
        <group
          name="radiant_rangedvmdl_c_1"
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.025}>
          <primitive object={nodes.Root_0} />
          <primitive object={nodes.char_origin} />
        </group>
        <skinnedMesh
          name="radiant_rangedvmdl_cradiant_ranged_model"
          geometry={nodes.radiant_rangedvmdl_cradiant_ranged_model.geometry}
          material={materials.lane_radiant_ranged_color}
          skeleton={nodes.radiant_rangedvmdl_cradiant_ranged_model.skeleton}
        />
      </group>
    </group>
  )
}

export default Radiant_Ranged;