import { 
    WebGLRenderer, 
    PerspectiveCamera, 
    Scene, 
    Euler,
    DirectionalLight,
    Quaternion,
    AnimationMixer,
    Object3D,
    AmbientLight,
    Color,
    Mesh,
    MeshPhongMaterial,
    TorusGeometry
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useEffect, useRef, useState } from 'react';
import LoadAnimation from './readSMD';
import './3Dmodel.css';

const Model3D = ({heroName}) => {
    const canvasRef = useRef(null);
    const mixers = useRef([]);
    const container = useRef();
    const [SMD, setSMD] = useState(null);
    const isDragging = useRef(false);
    const previousMousePosition = useRef({ x: 0, y: 0 });

    const GetFiles = async () => {
        const response = await fetch(
            `http://localhost:3001/hero/getHeroFile/${heroName}`, 
            {
                method: 'GET'
        });

        const result = await response.json();
        setSMD(result.smdFileName);
    }

    useEffect(() => {
        GetFiles();
    }, [])
    
    const Init = () => {
        const canvas = canvasRef.current;
        const renderer = new WebGLRenderer({antialias: true, canvas});

        const fov = 45; 
        const aspect = 2;
        const near = 1;
        const far = 500; 
        const camera = new PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 500;

        const scene = new Scene();
        // scene.background = new Color(0x454545);

        {
            const light = new DirectionalLight(0xFFFFFF, 2.5);
            light.position.set(0, 200, 100);
            scene.add(light);

            const ambientLight = new AmbientLight(0xFFFFFF, 0.75);
            scene.add(ambientLight);
            ambientLight.position.set(0, 200, 100);
        }

        // const geometry = new TorusGeometry(10, 3, 16, 100);
        // const material = new MeshPhongMaterial({ color: 0x00ff00 });
        // const torus = new Mesh(geometry, material);
        // torus.scale.set(5, 5, 5);
        // scene.add(torus);

        const loader = new GLTFLoader();

        loader.load(
            `http://localhost:3001/assets/models/heroes/${heroName.toLowerCase()}/${heroName.toLowerCase()}.gltf`,  // 使用从网站根目录开始的路径
            async (gltf) => {
                container.current = new Object3D();
                const model = gltf.scene
                container.current.add(model)

                scene.add(container.current);
                model.position.z = -120;
                container.current.position.z = 120;
                container.current.position.y = -40;

                let mixer;

                const animation = await LoadAnimation(`http://localhost:3001/assets/models/${SMD}`);
                mixer = new AnimationMixer(gltf.scene);
                mixers.current.push(mixer);
                
                const action = mixer.clipAction(animation);
                action.play();     
            },
            undefined,
            (error) => {
                console.error('加载模型报错:', error);
            }
        );

        // 让显示的像素和canvas的大小一致，避免物体锯齿
        const ResizeRendererToDisplaySize = (renderer) => {
            const pixelRatio = window.devicePixelRatio;
            // window.devicePixelRatio 是一个表示当前显示设备的物理像素分辨率与CSS像素分辨率的比率的属性。
            // 在高分辨率显示设备上，如果网页和应用没有考虑 devicePixelRatio，图像和元素可能会显得模糊。
            // 通过使用这个比率来调整图像和画布的分辨率，开发者可以确保内容在所有设备上都保持清晰
            const width = Math.floor( canvas.clientWidth * pixelRatio );
            const height = Math.floor( canvas.clientHeight * pixelRatio );

            const needResize = canvas.width !== width || canvas.height !== height;

            if(needResize){
                renderer.setSize(width, height, false);
            }

            return needResize;
        }

        let previousTime = 0;
        
        const render = (time) => {
            time *= 0.001;

            if (mixers.current.length > 0) {
                mixers.current.forEach((mixer) => {
                    mixer.update(time - previousTime);  // 更新每个 mixer
                });
            }

            previousTime = time;

            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix(); //更新相机投影矩阵

            if (ResizeRendererToDisplaySize(renderer)) {
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }
    
            renderer.render(scene, camera);
    
            requestAnimationFrame(render); 
        }

        requestAnimationFrame(render);
    };

    useEffect(() => {
        const canvas = canvasRef.current;

        const handleMouseDown = (e) => {
            isDragging.current = true;
            previousMousePosition.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseMove = (e) => {
            if (isDragging.current) {
                const deltaMove = {
                x: e.clientX - previousMousePosition.current.x,
                y: e.clientY - previousMousePosition.current.y
                };
                const deltaRotationQuaternion = new Quaternion()
                .setFromEuler(new Euler(
                    0,
                    deltaMove.x * Math.PI / 360,
                    0,
                    'XYZ'
                ));
                container.current.quaternion.multiplyQuaternions(deltaRotationQuaternion, container.current.quaternion);
                previousMousePosition.current = { x: e.clientX, y: e.clientY };
            }
        };

        const handleMouseUp = () => {
            isDragging.current = false;
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
        };
    }, [])

    useEffect(() => {
        if (SMD) {
            console.log('333')
            Init();
        }
    }, [SMD])

    return(
        <div style={{
            position:'absolute', 
            height:"100%", 
            width: '100%',
            zIndex: 0
        }}>
            <canvas ref={canvasRef} 
                style={{
                    width:"100%", 
                    height:"100%", 
                    display:"block"
            }}></canvas>
        </div>
    );
};

export default Model3D;