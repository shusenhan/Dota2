import { useState, useRef } from "react";
import Friend from "./Friend";
import useOutsideClick from "../useOutsideClick";
import { useNavigate } from "react-router-dom";

const Friends = ({friends}) => {
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const ref = useRef(null);
    const navigate = useNavigate();

    useOutsideClick(ref, () => {
        setOpenMenuIndex(null)
    });

    const RightClick = (index, event) => {
        event.preventDefault();
        navigate(`/personal/?username=${friends[index].UserName}`);
    };

    return (
        <div ref={ref} style={{
            height: '100%',
            width: '100%',
        }}>
            {friends && friends.map((friend, index) => (
                <div 
                    key={friend.UserId} 
                    onClick={() => setOpenMenuIndex(index)}
                    onContextMenu={(event) => RightClick(index, event)}
                    style={{
                        width: '100%', 
                        height:'10%'
                }}>
                    <Friend 
                        friend={friend} 
                        openMenu={openMenuIndex === index} 
                        setOpenMenu={() => setOpenMenuIndex(null)}
                    />
                </div>
            ))}
        </div>
    )
}

export default Friends;