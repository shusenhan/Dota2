import io from 'socket.io-client';
import notify from '../component/ToastBox.tsx';

export function SocketInitialize (username){
    const connection = io('http://localhost:3001');
    connection.on('connect', () => {
        console.log('连接成功');
    });

    UserLogin(connection, username);
    FriendLogin(connection);

    return connection;
}

function UserLogin (socket, username) {
    socket.emit('user:login', { UserName: username});
}

function FriendLogin (socket) {
    socket.on('friend:login', (data) => {
        notify('success', `好友${data.FriendName}登录`);
    });
}

export function SendMessage (socket, message, targetUser, sender) {
    socket.emit('user:sendMessage', {TargetUser: targetUser, Message: message, Sender: sender});
}

export function ReceiveMessage (socket, AddHistory) {
    socket.on('friend:sendMessage', (data) => {
        AddHistory({Message: data.Sender + ": " + data.Message, Me: false}, data.Sender)
    })
}

export function CloseSocket(socket) {
    if (socket) {
        socket.close();
    }
}