//index.js is for setting up the server
import express from "express";
//same as const express = require('express')

//take incoming post request bodies
import bodyParser from "body-parser";

//we are importing the usersRoutes (named it ourself) from the users.js file
import usersRoutes from './routes/users.js';

//initializing our express app
const app = express();

//specify the port, uppercase because we're never changing the port
const PORT = 5000;

//bodyParser middleware
//just means we will be using json throughtout the app
app.use(bodyParser.json());

//we set the starting path for all the routes in the users fil
//we are using the usersRoutes we imported from users.js
//when people visit the path '/users' we will use or run the usersRoutes (we just imported)
app.use('/users', usersRoutes); 

//creating out route, that's a get request to the home page and we add a callback function which takes in a request and a response
//browsers can only make GET requests, ex if you search google.com it's a get request
app.get('/', (req, res) => {
    console.log('[TEST] This is a test');   
    res.send('Hello World'); //send a response to the client
});

//make the app listen for incoming requests
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));

//if we run nodemon index.js it'll show some errors

