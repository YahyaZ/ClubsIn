import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose, { Model, Schema } from 'mongoose';

const app = express();
const router = express.Router();
const API_PORT = process.env.API_PORT || 3001;

//temporary way to connect our db
mongoose.connect('mongodb://<username>:<password>@ds111562.mlab.com:11562/clubbin');

//start off with testing basics
let userSchema = new mongoose.Schema({
    name: String,
    email: String
});
let users = mongoose.model('Users', userSchema, 'users');

let getUsers = function(callback){
    users.find(function(err, userss){
        if(err) return console.error(err);
        //console.log(userss);
        callback(userss);
    })
}


router.get('/', (req, res) => {
    getUsers(function(result){
        //get callback then display
        res.send(result);
    })
    //res.json(getUsers());
    //getUsers();
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));