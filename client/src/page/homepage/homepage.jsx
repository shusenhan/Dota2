import { Button, useTheme, useMediaQuery } from "@mui/material";
import './homepage.css'
import HeroList from "../../component/Heros";

const HomePage = () => {
    const theme = useTheme();
    const largeScreen = useMediaQuery("(min-width:1000px)");
    const color1 = theme.palette.primary.main;
    const color2 = theme.palette.secondary.main;

    return (
        <div className="HomePageContent"
            style={{ 
        }}>
            <div className="Box2">

                <div className="Box3">
                    <HeroList style={{flexBasis: '60%'}}/>
                    <div style={{flexBasis: '40%'}}>DIV</div>
                </div>
            </div>
        </div>
    )
};

export default HomePage;