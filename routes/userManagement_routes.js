const express = require('express');
const app = express();
const routes = app.use(express.Router());
const subUser = require('../controller/userManagement_controller');
const { auth } = require('../middleware/auth');

routes.post('/addRestaurantMember',auth, subUser.addSubUser);
routes.get('/getSubUserList',auth, subUser.getSubUserList);
routes.post('/searchSubUser',auth, subUser.searchSubUser);
routes.put('/updateSubUser/:id',auth, subUser.updateSubUser);
routes.get('/viewPermissions',auth, subUser.viewPermissions);
routes.put('/updatePermissions/:id',auth, subUser.updatePermissions);
routes.delete('/deleteSubUser/:id',auth,subUser.deleteSubUser);

exports.routes = routes;