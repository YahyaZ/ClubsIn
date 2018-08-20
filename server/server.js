import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import database from './database-handler';

const app = express();
const router = express.Router();
const API_PORT = process.env.API_PORT || 3001;

//Allows the application to parse the body of requests to access data
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/**
 * localhost:3001/api/clubs
 * retrieves all currently existing clubs
 */
router.get('/clubs', (req, res) =>{
    database.getClubs(function(result){
        res.send(result);
    })
})

/**
 * Creates a club in the database
 * TODO: Add authentication on creating a club. NO DUPLICATES
 */
router.post('/create-club', (req, res)=> {
    database.createClub(function(result){
        res.send(result);
    }, req.body.name, req.body.type, req.body.university);
})

/**
 * Finds a single club instance in the collection using
 * name and university strings and returns result (error or club details)
 */
router.post('/club', (req, res) => {
    database.findClub(function(result){
        try{
            res.send(`${result.name} ${result.university}`);
        } catch(err){res.send(`Club not found`);}
    }, req.body.name, req.body.university);
})

/**
 * localhost:3001/api/login
 * call's finduser based on provided parameters
 * MOCK DATA FOR NOW
 */
router.post('/login', (req, res) =>{
    database.findUser(function(result){
        try {
            res.send(`${result.firstName} ${result.lastName}`);
        }catch(err){
            res.send(`Authentication failed: incorrect details`);
        }
    }, "Yahyaiscool@cool.com", "touchmeDaddy");
});

/**
 * localhost:3001/api/signup
 * Registers a user based on provided parameters
 * MOCK DATA
 */
router.post('/signup', (req, res) =>{
    var user = req.headers;
    //console.log(JSON.stringify(req.body));
    database.registerUser(function(result){
        res.send(result);
    }, req.body.name, req.body.lastName, req.body.email, req.body.password);
});

/**
 * Homepage GET function
 * Returns array of all users for now
 * TODO: Modify functionality to suit homepage
 */
router.get('/', (req, res) => {
    database.getUsers(function(result){
        //get callback then display
        res.send(result);
    })
});

//localhost3001:api
app.use('/api', router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`)); 