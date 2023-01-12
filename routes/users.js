import express from "express";
import {v4 as uuidv4} from 'uuid';

//we initialize our router
const router = express.Router();

const users = [
    {
    name: "bishal0922",
    last: "what is none",
    age: 35
    },
    {
    name: "bishal0923",
    last: "what is none",
    age: 35
    },
]

//we use the router to create a route
//path of the first route is users
//in the first parameter we specify the path as just a "/" because all routes here start with "/users" and if we had specified
//"/users" in router.get(...) then the path would be "/users/users"
router.get('/', (req, res) => {
    console.log("get request reached");

    res.send(users);
});


//now we can use front end to send data
router.post('/', (req, res) => {
    //now we have to deal data we are sending in
    //we can access the data we are sending in through the request object
    const user = req.body;

    //generate a unique userid
    const userID = uuidv4();

    //we can add a new property to the user object
    const userWithID = {...user, id: userID};

    users.push(userWithID);
    res.send(`The user ${user.name} was added to the database`)
});

export default router;