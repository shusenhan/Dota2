import { createContext, useContext, useState, lazy } from "react"
import themes from '../../theme/themes.js'

const settingContext = createContext();

export function SettingProvider({children}) {
    const [currentTheme, setCurrentTheme] = useState(themes.theme2);

    const ChangeTheme = (theme) => {
        setCurrentTheme(theme);
    }

    return (
        <settingContext.Provider value={{currentTheme, ChangeTheme}}>
            {children}
        </settingContext.Provider>
    )
}

export function useSetting(){
    return useContext(settingContext);
}