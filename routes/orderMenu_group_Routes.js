const express=require('express')
const app=express()
const routes = app.use(express.Router());
const {auth} =require('../middleware/auth')
const data=require('../controller/orderMenuGroup_controller')

routes.post('/createQRgroup',auth,data.createGroup)

exports.routes = routes;
