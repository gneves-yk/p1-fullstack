const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const Message = require('./model/Message'); 

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes); 


app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/login.html'); 
});


app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/views/register.html'); 
});


app.get('/chat-list', (req, res) => {
  res.sendFile(__dirname + '/views/chatList.html'); 
});


app.get('/chat/:roomId', (req, res) => {
    res.sendFile(__dirname + '/views/chatRoom.html'); 
});

io.on('connection', (socket) => {
    console.log('Novo usuário conectado');

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId); 
        console.log(`Usuário entrou na sala: ${roomId}`);
    });

    socket.on('message', async (messageData) => {
        const { roomId, userId, content } = messageData;

        try {
            const message = new Message({ roomId, userId, content });
            await message.save(); 

           
            io.to(roomId).emit('message', message); 
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
