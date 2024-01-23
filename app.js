const express = require('express');
const { projects } = require("./data.json");
const app = express();
const path = require('path');

//middleware setup of view engine to pug
app.set('view engine', 'pug');

//use static files
app.use('/static', express.static('public'));

//home page route
app.get('/', (req, res,) => {
    res.render('index', { projects });
})

//about page route
app.get('/about', (req, res, next) => {
    res.render('about');
})

//dynamic project route
app.get('/project/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects[projectId];

    if(project){
        res.render('project', { project });
    } 
    else {
        const err = new Error();
        err.message = 'Error! Project not found.';
        err.status = 404;
        console.log(err.message, err.status);
        res.render("page-not-found", { err });
    }
})

//404 handler
app.use((req, res, next) => {
    const err = new Error();
    err.message = "Error! Search was not found.";
    err.status = 404;
    console.log(err.message, err.status);
    res.render("page-not-found", { err });
})

//global error handler
app.use((req, res, next) => {
    err.message = err.message || "Error! Search was not found.";
    err.status = err.status || 500;
    console.log(`Error: ${err.message}`);
    res.render("error", { err });
})

//server
app.listen(3000);
