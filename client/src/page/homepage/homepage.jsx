import { Button, useTheme, useMediaQuery } from "@mui/material";
import './homepage.css'
import UserBox from "../../component/UserBox/UserBox";

const HomePage = () => {
    const theme = useTheme();

    return (
        <div className="HomePageContent">
            <UserBox />
        </div>
    )
};

export default HomePage;