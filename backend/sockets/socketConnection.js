const socket = require('socket.io');
const { saveMessage } = require('../controllers/messageController');

const onlineUsers = [];

const addUser = (user, socketId) => {
    const isUserExist = onlineUsers.findIndex((item) => item.id === user._id);
    if (isUserExist !== -1) {
        onlineUsers.splice(isUserExist, 1);
    }
    user.socketId = socketId;
    onlineUsers.push(user); // Push user with socketId
};


const removeUser = (socketId) => {
    const isUserExist = onlineUsers.findIndex((item) => item.socketId === socketId);
    if (isUserExist !== -1) {
        onlineUsers.splice(isUserExist, 1);
    }
};


const socketInitialize = (server) => {

    const io = socket(server, {
        cors: {
            origin: 'http://localhost:5173'
        }
    })

    io.on("connection", (socket) => {
        console.log(socket.id);

        socket.on("ADD_USER", (user) => {
            addUser(user, socket.id);
            io.emit("USER_ADDED", onlineUsers);
        });
        socket.on("SEND_MSG", async (msg) => {
            console.log(msg.msg, "MSG FROM FRONTEND");
            const isSaved = await saveMessage(msg)
            io.to(msg.receiver.socketId)
                .to(msg.sender.socketId)
                .emit("RECEIVE_MSG", isSaved);
        });
        socket.on("DELETED_MSG", (msg) => {
            socket.to(msg.receiver.socketId).emit("DELETED_MSG", msg)
        });
        socket.on("disconnect", () => {
            removeUser(socket.id);
            io.emit("USER_ADDED", onlineUsers);
        });

    });
}

module.exports = socketInitialize;