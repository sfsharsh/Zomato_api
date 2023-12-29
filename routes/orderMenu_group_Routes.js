const express=require('express')
const app=express()
const routes = app.use(express.Router());
const {auth} =require('../middleware/auth')
const data=require('../controller/orderMenuGroup_controller')

routes.post('/createQRgroup',auth,data.createGroup)
routes.get('/getgroups',auth,data.getgroup)
routes.get('/getGroupbyID/:id',auth,data.getgroupbyID)
routes.delete('/deleteGroup/:',auth,data.deleteGroup)
routes.put('/updateGroup/:id',auth,data.updateGroup)
routes.put('/changeStatus/:id',auth,data.changeStatus)
exports.routes = routes;
