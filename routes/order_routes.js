const express = require('express');
const app = express();
const routes = app.use(express.Router());
const order = require('../controller/order_controller');
const {upload} = require('../service/image');
const { auth } = require('../middleware/auth');


routes.post('/addorder',auth,upload, order.addorder);
routes.get('/getorder/:id',auth, order.getorder);
routes.get('/getorderbyid/:id',auth, order.getorderById);
routes.put('/updateorder/:id',auth,order.updateorder);
routes.put('/editorderStatus/:id',auth,order.editorderStatus);
routes.delete('/deleteorder/:id',auth,order.deleteorder);

exports.routes = routes;