const expres = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = expres();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('room', (room) => {
        socket.join(room);
    });

    socket.on('message', (message) => {
        socket.to(message.room).emit('returnMessage', message);
    })
})

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});