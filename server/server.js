import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes'

// Sets up the environment configurations
dotenv.config();

const app = express();
//const router = express.Router();
const API_PORT = process.env.API_PORT || 3001;

app.use(cors());
app.use(logger('dev'));

//Allows the application to parse the body of requests to access data
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



//All api requests will go through '/api'
app.use('/api', router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`)); 