const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const todosRoute = require('./routes/todos');

//middleware
app.use(bodyparser.json());

//route middleware
app.use('/', todosRoute);

const PORT = process.env.PORT|| 8000;
app.listen(PORT, ()=>{
    console.log(`server up and running http://localhost:${PORT}`);
})
