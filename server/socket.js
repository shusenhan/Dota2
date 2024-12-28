import { GetUserFriendList } from "./Database.js";

const users = {};

const SocketBasedFunction = (server) => {
    server.on('connection', (socket) => { 
        //好友登录告知 
        socket.on('user:login', async (data) => {  
            try { 
                users[data.UserName] = socket;
                const friendshipsResult = await GetUserFriendList(data.UserName);
                const friendships = friendshipsResult.data;
    
                if(friendships){
                    for(var friendship of friendships){
                        if(friendship.State === 1){
                            let friend = '';
                            if(friendship.User1 === data.UserName){
                                friend = friendship.User2;
                            }
                            else{
                                friend = friendship.User1;
                            }
    
                            const friendSocket = users[friend];
    
                            if(friendSocket){
                                friendSocket.emit('friend:login', {FriendName: data.UserName});
                            }
                        }
                    }
                }
                
            } 
            catch (error) {  
                socket.emit('error', { message: error.message });  
            }  
        }); 

        socket.on('user:sendMessage', (data) => {
            try{
                const receiver = data.TargetUser;
                const message = data.Message;
                const sender = data.Sender;
                console.log()

                const receiverSocket = users[receiver]

                if(receiverSocket){
                    console.log('send')
                    receiverSocket.emit('friend:sendMessage', {Message: message, Sender: sender})
                }
            }
            catch (error) {  
                socket.emit('error', { message: error.message });  
            }  
        })
    });
}

export default SocketBasedFunction;