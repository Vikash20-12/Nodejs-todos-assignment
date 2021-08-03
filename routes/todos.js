const express = require('express');
const router = require('express').Router();
const axios = require('axios');


//route to fetch todos list
router.get('/todos', async (req, res) => {
    var todoList = [];
    try {
        const todosAPI = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const todos = todosAPI.data;
        todos.forEach((tododata) => {
            todoList.push({ id: tododata.id, title: tododata.title, completed: tododata.completed });
        });
        res.status(200).send(todoList);
    } catch (err) {
        res.status(400).send(err);
    }
});

//route to mere todo in user data

router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    var userData = [];
    try {
        //fetching user data
        const userAPI = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        const userAPIdata = userAPI.data;
        userData.push(userAPIdata);

        //fetching todos
        const todoAPI = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const todoAPIdata = todoAPI.data;

        for (var i = 0; i < todoAPIdata.length; i++) {
           if( parseInt(id) === todoAPIdata[i].userId){
            userData.push(todoAPIdata[i]);
           }
        }
        res.status(200).send(userData);
    } catch (err) {
        res.status(400).send(err);
    }
});



module.exports = router;