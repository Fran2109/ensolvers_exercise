import Express from 'express';
import { port } from './args/args.js';
import cors, {whitelist} from './cors/cors.js';
import bodyParser from 'body-parser';
import { cookieSecret } from './configs/configs.js';
import cookieParser from 'cookie-parser';
import passport from './passport/passport.js';
import initializeServer from './server/initializeServer.js';
import notesRouter from './routers/notesRouter.js';
import userRouter from './routers/userRouter.js';
import categoriesRouter from './routers/categoriesRouter.js';
import { Server as socketIo } from 'socket.io';
import http from 'http';
import socketController from './controllers/socketController.js';

const app = Express();
const server = http.createServer(app);
const io = new socketIo(server, { cors: { origin: whitelist[0] } });

io.on('connection', (socket) => {
    socketController(io, socket);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(cookieSecret));
app.use(cors);
app.use(passport.initialize());

app.use('/api/notes', notesRouter);
app.use('/api/users', userRouter);
app.use('/api/categories', categoriesRouter);

initializeServer(server, port);