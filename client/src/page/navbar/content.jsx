import FlexBetween from "../../component/FlexBetween";
import './content.css';
import NavbarContentItem from "./item";

const NavbarContent = () => {
    return(
        <div className="NavbarContentContent">
            <NavbarContentItem className='item' name='英雄' image='../theme/hero/1.webp'/>
            <NavbarContentItem className='item' name='物品' image='../common/BKB.webp'/>
            <NavbarContentItem className='item' name='比赛' image='../common/TI.jpg'/>
            <NavbarContentItem className='item' name='版本' image='../common/Roshan.png'/>
            <NavbarContentItem className='item' name='世界' image='../common/Runes.webp'/>
        </div>
    )
};

export default NavbarContent;