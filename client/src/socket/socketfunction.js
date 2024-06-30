import io from 'socket.io-client';

export function SocketInitialize (connection){
    console.log('初始化socket');
    connection = io('http://localhost:3001');
    connection.on('connection', () => {
        console.log('连接成功');
    });

    connection.emit('user:login', { UserName: '测试用户'});
}