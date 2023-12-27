const express = require('express');
const app = express();
const routes = app.use(express.Router());
const user = require('../controller/user_controller');

routes.post('/signUp', user.signUp);
routes.post('/verifyOtp', user.verifyOtp);
routes.post('/login', user.login);
routes.put('/updateUser', user.updateUser);
routes.put('/resendOtp',user.reSendOtp);

exports.routes = routes; 