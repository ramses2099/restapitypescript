
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

import router from './router';

const app = express();

app.use(cors({
    credentials:true
}));

app.use(compression());

app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});

//db connection
const MONGO_URL = 'mongodb://root:pwd01@10.0.0.50:30070/restapitypescript?authSource=admin';
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on('error', (err: Error) => console.log(err));

// Router
app.use('/', router());