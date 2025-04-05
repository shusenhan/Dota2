import React, { createContext, useContext, useRef } from 'react';

const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
    const animationActions = useRef({});

    const setActions = (modelName, actions) => {
        animationActions.current[modelName] = actions;
    };

    const CleanAllAnimation = () => {
        animationActions.current = {};
    }

    return (
        <AnimationContext.Provider value={{ animationActions: animationActions.current, setActions, CleanAllAnimation }}>
            {children}
        </AnimationContext.Provider>
    );
};

export const useAnimationContext = () => useContext(AnimationContext);