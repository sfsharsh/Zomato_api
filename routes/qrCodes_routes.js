const express = require('express');
const app = express();
const routes = app.use(express.Router());
const qrcode = require('../controller/qrCodes_controller');
const {upload} = require('../service/image');
const { auth } = require('../middleware/auth');


routes.post('/addqrcode',auth,upload, qrcode.addqrcode);
routes.get('/getqrcode',auth, qrcode.getqrcode);
routes.get('/getqrcodebyid/:id',auth, qrcode.getqrcodeById);
routes.put('/updateqrcode/:id',auth,upload, qrcode.updateqrcode);
routes.put('/changeqrcodestatus/:id',auth, qrcode.changeqrcodestatus);
routes.delete('/deleteqrcode/:id',auth,qrcode.deleteqrcode);

exports.routes = routes;