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
db.once('open', function(){
    console.log('Successful connection');
})


const app = express();
const API_PORT = process.env.API_PORT || 3001;
// Store sessions in mongo
let MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  }));


app.use(cors());
app.use(logger('dev'));

//Allows the application to parse the body of requests to access data
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());




//All api requests will go through '/api'
app.use('/api', router);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
  });
  
// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`)); 