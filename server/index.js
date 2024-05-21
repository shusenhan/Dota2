import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import heroRouter from './routes/heros.js';
import skillRouter from './routes/skills.js'

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

const upload1 = multer({ storage: storageHero });
const upload2 = multer({ storage: storageSkill });

app.use("/hero", upload1.single("Image1"), heroRouter);
app.use("/skill", upload2.single("ImageFile1"), skillRouter)

const PORT = 3001;

async function startServer() {
    try {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

startServer();