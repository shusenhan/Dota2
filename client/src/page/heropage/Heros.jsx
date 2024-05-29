import HeroTypeCell from "./TypeCell";
import { strenghHeroList, agilityHeroList, intelligenceHeroList, universalHeroList } from "../../heroList";

const HeroList = (props) => {

    return(
        <div className="HeroList" 
            style={{
                height: '100%',
                display: 'grid',
                gap: '1% 4%',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridTemplateRows: '50% 50%',
                justifyContent: 'center',
                alignSelf: "flex-start",
                ...props.style
        }}>
            <HeroTypeCell heroList={strenghHeroList} type='Strength' cnType='力量'/>
            <HeroTypeCell heroList={agilityHeroList} type='Agility' cnType='敏捷'/>
            <HeroTypeCell heroList={intelligenceHeroList} type='Intelligence' cnType='智力'/>
            <HeroTypeCell heroList={universalHeroList} type='Universal' cnType='全才'/>
        </div>
    )
}

export default HeroList;