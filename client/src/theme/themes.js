import { lazy } from "react"

const Crownfall1_1 = lazy(() => import('./theme1/crownfall1_1'));
const NewFrontiers = lazy(() => import('./theme2/newfrontiers'))

const themes = {
    theme1: {
        name: '倾天之战',
        background: {
            type: 'video',
            loop: true,
            src: 'videos/commons/background.webm'
        },
        videos: [
            {
                zIndex: 2,
                scale: '55%',
                position: {x: '48%', y: '33%'},
                src: 'videos/commons/logo_schinese.webm'
            },
            {
                zIndex: 3,
                scale: '80%',
                position: {x: '10%', y: '12%'},
                src: 'videos/commons/header_fg.webm'
            }
        ],
        images: [],
        component: [
            {   
                zIndex: 4,
                position: {x: '58%', y: '81.1%'},
                type: Crownfall1_1
            }
        ]
    },
    theme2: {
        name: '大展宏图',
        background: {
            type: 'video',
            loop: false,
            src: 'videos/commons/map_update_2023_embiggening.webm'
        },
        videos: [],
        images: [],
        component: [
            {   
                zIndex: 4,
                position: {x: '1%', y: '2%'},
                type: NewFrontiers
            }
        ]
    }
}

export default themes;