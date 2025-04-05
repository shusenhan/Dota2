import './homepage.css'
import UserBox from "../../component/UserBox/UserBox";
import { useTheme } from "../../theme/themes";
import { Suspense } from "react";
import { useSetting } from '../setting/useSetting';

const HomePage = () => {
    const {currentTheme} = useSetting();

    return (
        <div className="HomePageContent">
            <UserBox />

            {currentTheme.videos.length > 0 && currentTheme.videos.map((item, index) => 
                <div key={index} 
                    style={{
                        height: '100%',
                        position: 'absolute', 
                        top: item.position.x,
                        left: item.position.y,
                        zIndex: item.zIndex
                }}>
                    <video autoPlay loop muted
                        src={`http://localhost:3001/assets/${item.src}`} 
                        style={{
                            height: item.scale,
                    }}/>
                </div>
            )}

            <Suspense fallback={<div>加载中</div>}>
                {currentTheme.component.length > 0 && currentTheme.component.map((item, index) => 
                    <div key={index}
                        style={{
                            height: '100%',
                            position: 'absolute', 
                            top: item.position.x,
                            left: item.position.y,
                            zIndex: item.zIndex
                    }}>
                        <item.type />
                    </div>    
                )}
            </Suspense>
        </div>
    )
};

export default HomePage;