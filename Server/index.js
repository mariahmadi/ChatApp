const express = require("express")
const app = express()
const server = require("http").createServer(app)
const socket = require("socket.io")
const cors = require("cors")
const Room = require("./Models/Room")
const Message = require("./Models/Message")
const { leaveRoom } = require('./Services/Utils')
const morgan = require("morgan")
const cookieparser = require("cookie-parser")
const { AddUser, GetUsers, removeUser } = require("./Services/User")
const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})
const router = require('./Router')
const mongoose = require("mongoose")
require('dotenv').config()
const MongoUrl = process.env.MONGO_CON_STRING
mongoose.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB Connect'))
    .catch(err => console.log(err)
    )
console.log(mongoose.connection.readyState);
app.use(cookieparser())

app.use('/public', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use('/api', router)


io.on('connection', (socket) => {

    console.log(socket.id);
    Room.find().then(result => {
        socket.emit('output-rooms', result)
    })
    socket.on('create-room', name => {
        const room = new Room({ name });
        room.save().then(result => {
            io.emit('room-created', result)
        })
    })
    socket.on('join', ({ name, room_id, user_id }) => {

        let allUsers = []
        const { error, user } = AddUser({
            socket_id: socket.id,
            name,
            room_id,
            user_id
        })

        socket.join(room_id);
        // let chatRoom = room_id;
        allUsers.push({ id: socket.id, username, room_id });
        let chatRoomUsers = allUsers.filter((user) => user.room === room_id);
        socket.to(room_id).emit('chatroom_users', chatRoomUsers);

        Message.find({ room_id }).then(result => {
            socket.emit('output-messages', result)
        })
        socket.emit('receive_message', {
            message: `Welcome ${username}`,
            username: user,
            __createdtime__,
        });

        let __createdtime__ = Date.now(); // Current timestamp
        // Send message to all users currently in the room, apart from the user that just joined
        socket.to(room_id).emit('receive_message', {
            message: `${username} has joined the chat room`,
            username: user,
            __createdtime__,
        });

    })
    // chatRoom = room;

    // socket.emit('chatroom_users', chatRoomUsers);
    socket.on('sendMessage', (message, room_id, callback) => {
        const user = GetUsers(socket.id);
        const msgToStore = {
            name: user.name,
            user_id: user.user_id,
            room_id,
            text: message
        }
        console.log('message', msgToStore)
        const msg = new Message(msgToStore);
        msg.save().then(result => {
            io.to(room_id).emit('message', result);
            callback()
        })

    })
    socket.on('leave_room', (data) => {
        const { username, room } = data;
        socket.leave(room);
        const __createdtime__ = Date.now();
        // Remove user from memory
        allUsers = leaveRoom(socket.id, allUsers);
        socket.to(room).emit('chatroom_users', allUsers);
        socket.to(room).emit('receive_message', {
            username: CHAT_BOT,
            message: `${username} has left the chat`,
            __createdtime__,
        });
        console.log(`${username} has left the chat`);
    });

    // socket.on('get-messages-history', room_id => {

    // })
    socket.on('disconnect', (socket) => {
        removeUser(socket.id);

        //     console.log('User disconnected from the chat');
        // const user = allUsers.find((user) => user.id == socket.id);
        // if (user?.username) {
        //   allUsers = leaveRoom(socket.id, allUsers);
        //   socket.to(chatRoom).emit('chatroom_users', allUsers);
        //   socket.to(chatRoom).emit('receive_message', {
        //     message: `${user.username} has disconnected from the chat.`,
        //   });
        // }

    })
});

server.listen(process.env.PORT, () => {
    console.log(`Server IS Running on PORT : ${process.env.PORT}`)
})