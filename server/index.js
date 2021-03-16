const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const router = require('./router');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
    console.log('New connection!!!');

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);
        
    });

    socket.on('disconnect', () => {
        console.log('User has left!!!')
    });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));