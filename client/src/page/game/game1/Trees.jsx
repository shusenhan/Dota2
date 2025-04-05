import { Model_Tree, Instances } from "../../../component/3D/Dire_tree006"
import { memo } from "react"

const Trees = memo(() => {
    const trees = [
        {position: [2, 0, 4], rotation: [0, 1, 0]},
        {position: [12, 0, 14], rotation: [0, 1.5, 0]},
        {position: [-2, 0, -41], rotation: [0, 2, 0]},
        {position: [4, 0, -21], rotation: [0, 2.5, 0]},
        {position: [-7, 0, 12], rotation: [0, 3, 0]},
        {position: [-42, 0, 33], rotation: [0, 3.5, 0]},
        {position: [32, 0, -19], rotation: [0, 4, 0]},
        {position: [21, 0, -2], rotation: [0, 4.5, 0]},
        {position: [-37, 0, 14], rotation: [0, 5, 0]},
        {position: [22, 0, 21], rotation: [0, 5.5, 0]},
        {position: [44, 0, 48], rotation: [0, 6, 0]}
    ]

    return(
      <>
        <Instances>
            {trees.map((item, index) => 
                <mesh key={index} position={item.position} rotation={item.rotation}>
                    <Model_Tree/>
                </mesh>
            )}
        </Instances>
      </>
    )
})

export default Trees;