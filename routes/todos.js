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
    var todoData = [];
    try {
        //fetching user data
        const userAPI = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        const userAPIdata = userAPI.data;
        // console.log(userAPIdata);
        userData.push(userAPIdata);

        //fetching todos
        const todoAPI = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const todoAPIdata = todoAPI.data;
        // console.log(todoAPIdata);

        // for(var i=0; i<todoAPIdata.length; i++){
        //     if(id === todoAPIdata[i].userId){
        //         todoData.push({todoAPIdata});
        //     }
        // }

        for (var i = 0; i < todoAPIdata.length; i++) {
           if( parseInt(id) === todoAPIdata[i].userId){
            userData.push(todoAPIdata[i]);
           }
        }

        // userData.push(todoData);

        console.log(userData);
        // console.log(todoData);

    } catch (err) {
        res.status(400).send(err);
    }
});



module.exports = router;