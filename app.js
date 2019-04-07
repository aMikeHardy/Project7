//require express
const express = require('express');
//require data.json file
const data = require('./data.json');
const { projects } = data;

const app = express();


app.use('/static', express.static('public'));
//set view engine to pug
app.set('view engine', 'pug');

//Home route
app.get('/', (req, res) =>{
  res.locals.data = data.projects;
  res.render('index');
});
//---------------------------

//project route
app.get('/projects/:id', (req, res) =>{
  const { id } = req.params;
  const text = projects[id];
  res.locals.data = data.projects;
  res.render('project', text);
});

//about route
app.get('/about', (req, res) =>{
  res.render('about');
});

//Error Handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  err.message = "Something Went Wrong";
  err.status = 404;
  console.log('There was an error. Page not found.')
  res.render('error', err);
});

//start server
app.listen(3000, ()=>{
  console.log('Server is running on Port 3000....');
});
