const express = require('express');
const fs = require('fs') //the engine require the fs module
//! create express app instance
const app = express();

//! define our template engine

app.engine('madeline', (filePath, options, callback) => { //define the view engine
    //reading template file
   fs.readFile(filePath, (err, content) => {
    //if there is a error return and pass the error to the callback function of the engine
    if(err) return callback(err)
    //if no error parse the template file
    const rendered = content.toString() //this is a very simple example for view engine
    .replace('#title#', '<h1>' + options.title + '</h1>')
    .replace('#message#', '<h2>' + options.message + '</h2>')
    .replace('#content#', '<div>' + options.content + '</div>')

    return callback(null, rendered) //null for no error
   })
})

//?config ========
app.set('views', './views') // specify the views folder in our app
app.set('view engine', 'madeline') // register the view engine (hypatia)


//! tell express app to use our new template engine

//! Routes
app.get('/', (req, res) => {
    // res.send("<h1>Hello World!</h1>")
    res.render('template', {title: 'Template title', message: 'My first template engine',content:'I created my own template engine'})
})

app.get('/about-me', (req, res) => {
    res.render("template", {
      title: "About Me",
      message: "Something about me",
      content: "I am the big boss",
    });
})





const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sever running on ${PORT}`)
})