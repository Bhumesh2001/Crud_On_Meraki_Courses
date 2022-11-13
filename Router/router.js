const express = require('express');
const Router = express();
const UserController = require('../Controller/controller')

Router.post('/CreateUser',UserController.CreateUser);

Router.get('/ReadUser/:id',UserController.ReadUser)

Router.patch('/UpdataUser/:id',UserController.UpdateUser)

Router.delete('/deleteUser/:id',UserController.deleteUser)

module.exports = Router