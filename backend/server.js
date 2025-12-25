import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoute from './routes/authroute.js';
import homeroute from './routes/homeroute.js';
import connectToMOngoDB from './db/connectToMongoDB.js';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import http from 'http';
import friendroute from './routes/friendroute.js'
import plantroute from './routes/plantroute.js'
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});


app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// app.use('/', (req, res) => {
//   res.send('Hello from the backend server!');
// });

app.use('/api/auth', authRoute);
app.use('/api/profile',homeroute);
app.use('/api/friends',friendroute);
app.use('/api/plants',plantroute);
 
const userSocketMap = {}; // {userId: socketId}

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    socket.on('register', (userId) => {
      userSocketMap[userId] = socket.id;
      console.log(`User ${userId} registered with socket ID ${socket.id}`);
    }
    );
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);

    });
  });
   io.emit("onlineUsers", Object.keys(userSocketMap));

const PORT = process.env.PORT ;
server.listen(PORT, () => {
    connectToMOngoDB();
  console.log(`Server is running on port ${PORT}`);
});
