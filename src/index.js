import express from 'express';
import http from 'http';
import { Server as SocketIoServer } from 'socket.io';
import { errorHandler } from './middlewares/error.middlewares.js';
import bodyParser from 'body-parser';
// modules/socket.mjs
import connectDB from './db/index.js';
import cors from 'cors';
import userRouter from './routes/app/auth/user.routes.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const server = http.createServer(app);

// Set up Socket.io using the Socket module
export default function setupSocket(server) {
    const io = new SocketIoServer(server);

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('message', (message) => {
            console.log('Message received:', message);
            io.emit('message', message); // Broadcast the message to all clients
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return io;
}
const io = setupSocket(server);

// Use the Express routes defined in the Routes module
app.get('/', (req, res) => {
    res.send('Welcome');
});

const PORT = 8000;

connectDB().then(() => {
    server.listen(PORT, async () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', userRouter);

app.use(errorHandler);
