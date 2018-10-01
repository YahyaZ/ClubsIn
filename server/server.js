/**
 * Starting the server and adds the required middleware
 */
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes'
import connectMongo from 'connect-mongo';



// Sets up the environment configurations
dotenv.config();

// Connect to database
mongoose.connect(process.env.DB_URL);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', function () {
  console.log('Successful connection');
})

// Creates the express router application
const app = express();
const API_PORT = process.env.API_PORT || 3001;

// Store sessions in mongo
let MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
  secret: 'work hard',
  store: new MongoStore({
    mongooseConnection: db
  })
}));


// Allows CORS in dev mode
app.use(cors());
app.use(logger('dev'));

//Allows the application to parse the body of requests to access data
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


//All api requests will go through '/api'
app.use('/api', router);



// If there is no Page give error of 404
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

/**
 * Catches all errors passed by the next() function in previous functions
 * Returns the Error as a json
 */
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ error: err.message })
});

// Start the server
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`)); 