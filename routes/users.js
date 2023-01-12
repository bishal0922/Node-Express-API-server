import express from "express";
import {v4 as uuidv4} from 'uuid';

//we initialize our router
const router = express.Router();

let users = [
    // {
    // name: "bishal0922",
    // last: "what is none",
    // age: 35
    // },
    // {
    // name: "bishal0923",
    // last: "what is none",
    // age: 35
    // },
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
    res.send(`The user ${user.firstName} was added to the database`)
});

//if its "/:id" then you're expecting anyting after the users path so the id doesn't really matter
router.get('/:id', (req,res)=>{
    //take the id value from req.params
    const {id} = req.params;

    const foundUser = users.find((user) => user.id === id);
    res.send(foundUser)
})

router.delete('/:id', (req, res) => {
    const{id, name} = req.params;

    //filter works such that it returns a new array with all the elements that pass the test (true)
    //if we are to delete a user we want to iterate through all the current users and make sure that the user we want to delete fails the filter test 
    //we can generate a False as (!True) by doing user.id !== is
    //if our id was 3 and we iterate over a ex users array being [2,6,1,4,3,7] then we would get [2,6,1,4,7] bc when we iterate over 3 it fails the test as user.id(3) !== 3(we receive from req.params)
    users = users.filter((user) => user.id !== id);

    res.send(`User with the id ${id} was deleted from the database`);

});

router.patch('/:id', (req, res) => {
    const {id} = req.params //params from the url
    const {firstName, lastName, age} = req.body;

    //we want to find the user we want to update so we iterate a return a match
    const userToBeUpdated = users.find((user) => user.id === id);

    if (firstName){
        userToBeUpdated.firstName = firstName;
    }
    if (lastName){
        userToBeUpdated.lastName = lastName;
    }
    if (age){
        userToBeUpdated.age = age;
    }

    res.send(`User with the id ${id} and name ${userToBeUpdated.firstName} has been updated`)

    
});

export default router;