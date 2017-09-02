module.exports = function (io) {
    //创建一个对象用来保存登录的用户的信息
    var connectUser = {};

    //监听客户端的连接
    io.on('connection', function (socket) {
        //客户端一连进来就需要保存与此客户端建立的socket的信息
        connectUser[socket.id] = {socket: socket};

        //客户端连接进来后的第一件事就是告诉服务器自己的名字
        socket.on('tell_my_name_to_server', function (username) {
            io.sockets.emit('into', username + '进入聊天室');
            connectUser[socket.id]['name'] = username
        });

        //监听客户端的发送的消息，然后广播给所有的客户
        socket.on('c2s', function (msg) {
            io.sockets.emit('s2c', msg);
        });

        //监听某一客户端的断开连接
        socket.on('disconnect', function () {
            username = connectUser[socket.id]['name'];
            io.sockets.emit('out', username + '离开了聊天室');
            delete connectUser[socket.id]
        });
    });
};
