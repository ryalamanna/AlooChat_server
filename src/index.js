
import { httpServer } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from 'dotenv';
// Load environment variables based on the environment
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
/**
 * Starting from Node.js v14 top-level await is available and it is only available in ES modules.
 * This means you can not use it with common js modules or Node version < 14.
 */
const majorNodeVersion = +process.env.NODE_VERSION?.split(".")[0] || 0;
const startServer = () => {
  httpServer.listen(process.env.PORT || 8000, () => {
    console.info(
      `📑 Visit the documentation at: http://localhost:${
        process.env.PORT || 8000
      }`
    );
    console.log("⚙️  Server is running on port: " + process.env.PORT);
  });
};

if (majorNodeVersion >= 14) {
  try {
    await connectDB();
    startServer();
  } catch (err) {
    console.log("Mongo db connect error: ", err);
  }
} else {
  connectDB()
    .then(() => {
      startServer();
    })
    .catch((err) => {
      console.log("Mongo db connect error: ", err);
    });
}



































// import express from 'express';
// import http from 'http';
// import { Server as SocketIoServer } from 'socket.io';
// import { errorHandler } from './middlewares/error.middlewares.js';
// import bodyParser from 'body-parser';
// // modules/socket.mjs
// import connectDB from './db/index.js';
// import cors from 'cors';
// import userRouter from './routes/app/auth/user.routes.js';
// import dotenv from 'dotenv';
// dotenv.config();
// const app = express();
// const server = http.createServer(app);

// // Set up Socket.io using the Socket module
// export default function setupSocket(server) {
//     const io = new SocketIoServer(server);

//     io.on('connection', (socket) => {
//         console.log('A user connected');

//         socket.on('message', (message) => {
//             console.log('Message received:', message);
//             io.emit('message', message); // Broadcast the message to all clients
//         });

//         socket.on('disconnect', () => {
//             console.log('A user disconnected');
//         });
//     });

//     return io;
// }
// const io = setupSocket(server);

// // Use the Express routes defined in the Routes module
// app.get('/', (req, res) => {
//     res.send('Welcome');
// });

// const PORT = 8000;

// connectDB().then(() => {
//     server.listen(PORT, async () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// });

// app.use(
//     cors({
//         origin: process.env.CORS_ORIGIN,
//         credentials: true,
//     })
// );


// app.use(errorHandler);
