import express from "express";
import http from 'http';
import dotenv from "dotenv";
import {mongoDB} from "./config/dbConnection";
const cors = require('cors');
const env = dotenv.config();
mongoDB.connectDB();
const app = express();
const port = process.env.port || 3002;
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
app.use('/api/users',require('./router/usersRoutes'));
app.use('/api/auth',require('./router/authRoutes'));
server.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}/`)
})