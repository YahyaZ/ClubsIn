/**
 * Starting the server and adds the required middleware
 */
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectMongo from 'connect-mongo';
import router from './routes';


// Sets up the environment configurations
if (process.env.NODE_ENV === 'test') {
    console.log('Using Test Environment');
    dotenv.config({ path: `${path.resolve()}/server/.env` });
} else {
    dotenv.config();
}

// Connect to database
const dbURL = process.env.NODE_ENV === 'test' ? process.env.DB_TEST_URL : process.env.DB_URL;
mongoose.connect(dbURL);

// Once connected
const db = mongoose.connection;
db.on('error', () => console.log('Mongoose Connection Failed'));
db.once('open', () => {
    if (process.env.NODE_ENV !== 'test') {
        console.log('MongoDB connected!');
    }
});

// Creates the express router application
const app = express();
const API_PORT = process.env.API_PORT || 3001;

// Store sessions in mongo
const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: db,
    }),
}));


// Allows CORS in dev mode
app.use(cors());
if (process.env.NODE_ENV !== 'test') {
    // Do not use logger in test mode
    app.use(morgan('dev'));
}

// Allows the application to parse the body of requests to access data
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());


// All api requests will go through '/api'
app.use('/api', router);


// If there is no Page give error of 404
app.use((err, _req, _res, next) => {
    if (!err) {
        const error = new Error('File Not Found');
        error.status = 404;
        next(error);
    } else {
        next(err);
    }
});

/**
 * Catches all errors passed by the next() function in previous functions
 * Returns the Error as a json
 */
app.use((err, _req, res, _next) => {
    res.status(err.status || 500).json({ error: err.message });
});

// Start the server
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

export default app;
