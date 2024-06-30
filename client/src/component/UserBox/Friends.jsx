import Friend from "./Friend";

const Friends = ({friends}) => {
    return (
        <div style={{
            height: '100%',
            width: '100%',
        }}>
            {friends && friends.map((friend, index) => (
                <Friend key={index} friend={friend}/>
            ))}
        </div>
    )
}

export default Friends;