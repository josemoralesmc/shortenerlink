import express from "express";
import config from "./config/config";
import routerUrl from "./routes/url.routes";
import routerSession from './routes/session.routes'
import setUpEnviroment from '../database/index'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import { runMongo } from "../database/mongo";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());


setUpEnviroment();
runMongo();



const corsOptions = {
  origin: 'https://shortfront.onrender.com', // Reemplaza esto con el origen de tu frontend
  credentials: true,
};

app.use(cors(corsOptions));
app.use('/auth', routerSession);
app.use("/", routerUrl);

app.listen(config.PORT, () => {
  console.log(`Server running in port: ${config.PORT}`);
});
