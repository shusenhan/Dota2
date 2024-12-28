import { Quaternion, Euler, Vector3, AnimationClip, VectorKeyframeTrack, QuaternionKeyframeTrack } from 'three';

const readSMD = function(content) {
    let lines = content.split('\n');

    let joints = [];
    let currentFrame = 0;
    let tracks = [];

    let handler = null;
    let rootIndex = -1;

    function handleJoint(line) {
        let items = line.split(/\s+/);

        if (items.length > 3) {
            items = [items[0], items.slice(1, items.length - 1).join(' '), items[items.length - 1]];
        }

        if (items.length === 3) {
            let idx = parseInt(items[0], 10);
            let name = items[1].replace(/"/g, '');
            let parentIdx = parseInt(items[2], 10);

            if (parentIdx === -1) {
                rootIndex = idx;
            }

            joints[idx] = name;
        }
    }

    function handleAnimation(line) {
        let items = line.split(/\s+/);
        
        if (items[0] === 'time') {
            currentFrame = parseInt(items[1]);
        } 
        else if (items.length === 7) {
            let idx = parseInt(items[0]);

            if (!tracks[idx]) {
                tracks[idx] = {position: [],rotation: [],times: []};
            }

            let pos = new Vector3(parseFloat(items[1]), parseFloat(items[2]), parseFloat(items[3]));
            let quat = new Quaternion();

            quat.setFromEuler(new Euler(parseFloat(items[4]),parseFloat(items[5]),parseFloat(items[6]),'ZYX'));

            if (idx === rootIndex) {
                let rotateX90 = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2);
                quat.multiplyQuaternions(rotateX90, quat);
            }

            tracks[idx].times.push(currentFrame / 30);
            tracks[idx].position.push(pos.x, pos.y, pos.z);
            tracks[idx].rotation.push(quat.x, quat.y, quat.z, quat.w);
        }
    }

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        switch (line) {
            case 'nodes':
                    handler = handleJoint;
                    break;
            case 'skeleton':
                    handler = handleAnimation;
                    break;
            case 'end':
                    handler = null;
                    break;
            default:
                if (handler) {
                    handler(line);
                }
        }
    }

    let tracksArray = [];
    for (let i = 0; i < joints.length; i++) {
        if (tracks[i]) {
            const positionTrack = new VectorKeyframeTrack(`${joints[i]}.position`, tracks[i].times, tracks[i].position);
            const quaternionTrack = new QuaternionKeyframeTrack(`${joints[i]}.quaternion`, tracks[i].times, tracks[i].rotation);
            tracksArray.push(positionTrack, quaternionTrack);
        }
    }

    return new AnimationClip('DefaultAction', -1, tracksArray);
};

export const LoadAnimation = async (path) => {
    try {
        const response = await fetch(path);
        const smdData = await response.text();
        const clip = readSMD(smdData);

        return clip;
    } catch (error) {
        console.error('加载模型动画错误：', error);
        throw error;
    }
}

export default readSMD;