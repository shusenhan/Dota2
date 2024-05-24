import './footer.css';

const Footer = () => {
    return(
        <div className="FooterContent">
            <div className='UserBoxGroup'>
                组队
            </div>
            <button className="BeginDOTA">开始DOTA</button>
            <div className="HomePageChatBox">
                <div style={{
                    flexBasis: '22%',
                    color: 'rgb(67, 161, 98)',
                    fontSize: '10px',
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '22%'
                }}>
                    对(神仙丸)说:
                </div>
                <input type="text" className="HomePageChatInput" placeholder="在此处输入聊天内容"/>

                <div style={{
                    flexBasis: '8%',
                }}>

                </div>
            </div>
        </div>
    )
}

export default Footer;