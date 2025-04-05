import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useAnimationContext } from '../useAnimations.jsx'

function Creep_Bad_Melee({anim='idle', ...props}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('http://localhost:3001/assets/models/creep_bad_melee/creep_bad_melee.glb')
  const { actions } = useAnimations(animations, group)
  const { setActions } = useAnimationContext();

    useEffect(() => {
        setActions('Creep_Bad_Melee', actions)
        actions[anim].play();
    },[anim])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="creep_bad_meleevmdl_c">
        <group
          name="creep_bad_meleevmdl_c_1"
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.025}>
          <primitive object={nodes.char_origin} />
          <primitive object={nodes.root} />
        </group>
        <skinnedMesh
          name="creep_bad_meleevmdl_ccreep_bad_melee_model"
          geometry={nodes.creep_bad_meleevmdl_ccreep_bad_melee_model.geometry}
          material={materials.creep_bad_melee_color}
          skeleton={nodes.creep_bad_meleevmdl_ccreep_bad_melee_model.skeleton}
        />
        <skinnedMesh
          name="creep_bad_meleevmdl_ccreep_bad_melee_cavern"
          geometry={nodes.creep_bad_meleevmdl_ccreep_bad_melee_cavern.geometry}
          material={materials.bad_melee_cavern}
          skeleton={nodes.creep_bad_meleevmdl_ccreep_bad_melee_cavern.skeleton}
        />
      </group>
    </group>
  )
}

export default Creep_Bad_Melee;