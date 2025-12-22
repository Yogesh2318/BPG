import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoute from './routes/authroute.js';
import homeroute from './routes/homeroute.js';
import connectToMOngoDB from './db/connectToMongoDB.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', (req, res) => {
  res.send('Hello from the backend server!');
});

app.use('/api/auth', authRoute);
app.use('/api/profile',homeroute);


const PORT = process.env.PORT ;
app.listen(PORT, () => {
    connectToMOngoDB();
  console.log(`Server is running on port ${PORT}`);
});
