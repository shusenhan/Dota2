import Image from '../../component/Image';
import './heropage.css'

const HeroPage = ({}) => {
    return(
        <div className="HeroPageContent">
            HeroPage
            <div className='HeroPageBox2'>
                <Image width='220px' height='124px' src='http://localhost:3001/assets/heros/Warlock_icon.webp'/>
            </div>
        </div>
    )
}

export default HeroPage;