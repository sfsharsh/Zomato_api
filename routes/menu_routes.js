const express = require('express');
const app = express();
const routes = app.use(express.Router());
const menu = require('../controller/menu_controller');
const {upload} = require('../service/image');
const { auth } = require('../middleware/auth');


routes.post('/addmenu',auth,upload, menu.addMenu);
routes.get('/getmenu',auth, menu.getMenu);
routes.get('/getmenubyid/:id',auth, menu.getMenuById);
routes.put('/updatemenu/:id',auth,upload, menu.updateMenu);
routes.put('/changemenustatus/:id',auth, menu.changemenustatus);
routes.delete('/deletemenu/:id',auth,menu.deleteMenu);

exports.routes = routes;