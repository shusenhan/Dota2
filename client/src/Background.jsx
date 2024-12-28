import { useTheme } from "./theme/themes";

const Background = () => {
    const {currentTheme} = useTheme();

    if(currentTheme.background.type === "image"){
        return (
            <img src={`http://localhost:3001/assets/${currentTheme.background.src}`}>
                
            </img>
        )
    }
    else{
        return(
            <video autoPlay loop={currentTheme.background.loop} muted className="VideoBackground">
                <source src={`http://localhost:3001/assets/${currentTheme.background.src}`} type="video/mp4"/>
            </video>
        )
    }
}

export default Background;