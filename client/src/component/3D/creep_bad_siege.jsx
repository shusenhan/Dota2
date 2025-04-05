
import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useAnimationContext } from '../useAnimations'

function Creep_Bad_Siege(props, {anim='creep_bad_siege_idle'}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('http://localhost:3001/assets/models/creep_bad_siege/creep_bad_siege.glb')
  const { actions } = useAnimations(animations, group)
  const { setActions } = useAnimationContext();

  useEffect(() => {
            setActions('N_Creep_Beast', actions)
            actions[anim].play();
        },[anim])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="creep_bad_siegevmdl_c">
        <group
          name="creep_bad_siegevmdl_c_1"
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.025}>
          <primitive object={nodes.char_origin} />
          <primitive object={nodes.root} />
        </group>
        <skinnedMesh
          name="creep_bad_siegevmdl_ccreep_bad_siege_model"
          geometry={nodes.creep_bad_siegevmdl_ccreep_bad_siege_model.geometry}
          material={materials.creep_bad_siege_color}
          skeleton={nodes.creep_bad_siegevmdl_ccreep_bad_siege_model.skeleton}
        />
      </group>
    </group>
  )
}

export default Creep_Bad_Siege;