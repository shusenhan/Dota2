import { createContext, useContext, useState } from "react";

const gameContext = createContext();

export const GameContextProvider = ({children}) => {
    const [showGame, setShowGame] = useState(-10);

    const HideGame = () => {
        setShowGame(-10);
    };

    const ShowGame = () => {
        setShowGame(50);
    }

    return(
        <gameContext.Provider value={{showGame, HideGame, ShowGame}}>
            {children}
        </gameContext.Provider>
    )
}

export const useGame = () => {
    return useContext(gameContext);
};