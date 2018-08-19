import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import database from './database-handler';

const app = express();
const router = express.Router();
const API_PORT = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

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
    console.log(JSON.stringify(req.body));
    database.registerUser(function(result){
        res.send(result);
    }, req.body.name, req.body.lastName, req.body.email, req.body.password);
});

router.get('/', (req, res) => {
    database.getUsers(function(result){
        //get callback then display
        res.send(result);
    })
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`)); 