import HeroCell from "../../component/HeroCell";
import './TypeCell.css';

const HeroTypeCell = ({heroList, type, cnType}) => {
    return (
        <div style={{height: '100%'}}>
            <div className="HeroTypeCellTitle">
                <img src={`http://localhost:3001/assets/commons/${type}_attribute_symbol.webp`} alt={`${type} heros`} style={{
                    height: '70%',
                    marginRight: '1%',
                }}/>
                {cnType}
            </div>
            
            <div className="HeroTypeCellContent">

                {heroList.map(([imageSrc, name2], index) => (
                        <HeroCell key={index} engName={imageSrc} cnName={name2}/>
                    ))}
            </div>
        </div>
    )
}

export default HeroTypeCell;