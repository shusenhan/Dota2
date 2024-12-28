import { createContext, useContext, useState, lazy } from "react"

const Crownfall1_1 = lazy(() => import('./theme1/crownfall1_1'));
const NewFrontiers = lazy(() => import('./theme2/newfrontiers'))

export const themes = {
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
                zIndex: 5,
                position: {x: '58%', y: '80.4%'},
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
                zIndex: 5,
                position: {x: '1%', y: '2%'},
                type: NewFrontiers
            }
        ]
    }
}

const themeContext = createContext();

export function ThemeProvider({children}) {
    const [currentTheme, setCurrentTheme] = useState(themes.theme1);

    const ChangeTheme = (theme) => {
        setCurrentTheme(theme);
    }

    return (
        <themeContext.Provider value={{currentTheme, ChangeTheme}}>
            {children}
        </themeContext.Provider>
    )
}

export function useTheme(){
    return useContext(themeContext);
}