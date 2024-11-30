import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import {Server} from "socket.io";

import heroRouter from './routes/heros.js';
import skillRouter from './routes/skills.js'
import aghanimRouter from "./routes/aghanim.js";
import inittalentRouter from "./routes/inittalent.js";
import talentRouter from "./routes/talent.js";
import itemRouter from "./routes/item.js";
import authRouter from "./routes/auth.js";
import communityRouter from "./routes/community.js";
import postRouter from "./routes/post.js";
// import { GetUserFriendList } from "./Database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storageHero = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets/heros");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const storageSkill = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets/skills");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const storageInitTalent = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets/inittalents");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const storageCommons = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets/commons");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const storagePost = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets/posts");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload1 = multer({ storage: storageHero });
const upload2 = multer({ storage: storageSkill });
const upload4 = multer({ storage: storageCommons });
const upload5 = multer({ storage: storagePost });

app.use("/hero", upload1.single("Image1"), heroRouter);
app.use("/skill",upload2.single("ImageFile1"), skillRouter);
app.use("/aghanim", aghanimRouter);
app.use("/inittalent",upload2.single("ImageFile1"), inittalentRouter);
app.use("/talent", talentRouter);
app.use("/item", itemRouter);
app.use("/auth", authRouter);
app.use("/community", upload4.single("ImageFile1"),communityRouter);
app.use("/post", upload5.array("ImageFiles", 4), postRouter);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {  
        origin: 'http://localhost:3000',
        credentials: true // 如果需要发送 cookies，设置为 true  
    }
});

const users = {};

io.on('connection', (socket) => {  
    socket.on('user:login', async (data) => {  
        try { 
            users[data.UserName] = socket;
            console.log('用户登录！')

            // const friendships = GetUserFriendList(data.UserName);

            // if(friendships){
            //     for(var friendship in friendships){
            //         if(friendship.State === 1){
            //             let friend = '';
            //             if(friendship.User1 === data.UserName){
            //                 friend = friendship.User2;
            //             }
            //             else{
            //                 friend = friendship.User1;
            //             }

            //             const friendSocket = users[friend];

            //             if(friendSocket){
            //                 friendSocket.emit('friend:login', data.UserName);
            //             }

            //             // 根据id获取socket对象，然后发送
            //         }
            //     }
            // }
            
        } catch (error) {  
            socket.emit('error', { message: error.message });  
        }  
    }); 
});

const PORT = 3001;

async function startServer() {
    try {
        server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

startServer();