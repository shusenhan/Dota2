import './heropage.css'
import HeroInfo from '../../component/HeroInfo';

const HeroPage = ({}) => {
    return(
        <div className="HeroPageContent">
            HeroPage
            <div className='HeroPageBox2'>
                <div className='HeroPageBox3'>
                    <HeroInfo/>
                </div>
                <div>技能，天赋，内容目录</div>
            </div>
        </div>
    )
}

export default HeroPage;