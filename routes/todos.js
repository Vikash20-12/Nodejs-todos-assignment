const express = require('express');
const router = require('express').Router();
const axios = require('axios');


//route to fetch todos list
router.get('/todos', async (req, res)=>{
    var todoList= [];
    try{
    const todosAPI = await axios.get('https://jsonplaceholder.typicode.com/todos');
    const todos = todosAPI.data;
    // JSON.stringify(todos);
    todos.forEach((tododata)=>{
       todoList.push({id: tododata.id, title: tododata.title, completed: tododata.completed});
    });
    // console.log(todoList);
    // console.log(todos);
    // console.log(todosAPI.data);
    res.status(200).send(todoList);
    }catch(err){
        res.status(400).send(err);
    }
});


// router.get('/user/:id', async(req, res)=>{
//     const {id}= req.params;
//     var userTodo = [];
//     try{
//         const userAPI = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
//         // console.log(userAPI.data);
//         userTodo.push(userAPI);
//         const todoAPI = await axios.get('https://jsonplaceholder.typicode.com/todos');
//         userTodo.push(todoAPI);
//        console.log(JSON.parse(userTodo));
//     }catch(err){
//         res.status(400).send(err);
//     }
// });


module.exports = router;