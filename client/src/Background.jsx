import { useSetting } from "./page/setting/useSetting";

const Background = () => {
    const {currentTheme} = useSetting();

    if(currentTheme.background.type === "image"){
        return (
            <img src={`http://localhost:3001/assets/${currentTheme.background.src}`}>
                
            </img>
        )
    }
    else{
        return(
            // 这里key是因为source的src的更新不会触发video重新渲染，所以必须要强制更新video
            <video key={currentTheme.background.src} autoPlay loop={currentTheme.background.loop} muted className="VideoBackground">
                <source src={`http://localhost:3001/assets/${currentTheme.background.src}`} type="video/mp4"/>
            </video>
        )
    }
}

export default Background;