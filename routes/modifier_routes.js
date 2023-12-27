const express = require('express');
const app = express();
const routes = app.use(express.Router());
const modifier = require('../controller/modifier_controller');
const { auth } = require('../middleware/auth');
const { upload } = require('../service/image');

routes.post('/addmodifier', auth, upload, modifier.addmodifier);
routes.get('/getmodifier', auth, modifier.getmodifier);
routes.get('/getmodifierbyid/:id', auth, modifier.getmodifierById);
routes.put('/updatemodifier/:id', auth, upload, modifier.updatemodifier);
routes.put('/changemodifierstatus/:id', auth, modifier.changemodifierstatus);
routes.delete('/deletemodifier/:id', auth, modifier.deletemodifier);

exports.routes = routes;