//Empty JS object setup
let projectData = {};
//express here is require to run all server and routes
const e = require('express');
const express = require('express');

// Start up App
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//here we are initializing the main project folder
app.use(express.static("website"));

// Cors here is use for cross origin allowance
const cors = require("cors"); 
app.use(cors());

//Add Route
app.post("/add", async function (req, res){
    const body = await req.body;
    projectData = body;
    // console.log(projectData);
    res.status(200).send(projectData);
});

//here we are initializing with a callback function to comeplete GET '/all
app.get("/all", async (req,res)=>{
    console.log(projectData);
     res.send(projectData);
})

//Here we are setting up our server

const port = 8008;
app.listen(port, function(){
    console.log('listening on port' + port);
});




