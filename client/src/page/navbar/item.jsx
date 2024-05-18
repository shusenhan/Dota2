import Image from "../../component/Image";

const NavbarContentItem = ({name, image}) => {
    return (
        <div 
            style={{
                border:'1px solid #FFB546',
                borderRadius:'5px',
        }}>
            <Image width='70px' height='55px' src={image}/>
            <div style={{color:'#E4EA2B'}}>{name}</div>
        </div>
    )
};

export default NavbarContentItem;