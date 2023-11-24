import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import cors from "cors";
import { errorHandler } from './middlewares/error.middlewares.js';
import userRouter from './routes/app/auth/user.routes.js'
import {initializeSocketIO} from './socket/index.js'
import chatRouter from './routes/app/chat/chat.routes.js';
import messageRouter from './routes/app/chat/message.routes.js'
import dotenv from 'dotenv';
// Load environment variables based on the environment
export const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
console.log(envFile);
dotenv.config({ path: envFile });


const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    },
});

app.set("io", io); // using set method to mount the `io` instance on the app to avoid usage of `global`

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
); 
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally
app.use(cookieParser());


app.get('/' , (req, res) => {
    res.send('Welcome')
})


app.use("/user", userRouter);

app.use("/chats", chatRouter);
app.use("/messages", messageRouter);



initializeSocketIO(io);



// common error handling middleware
app.use(errorHandler);

export { httpServer };