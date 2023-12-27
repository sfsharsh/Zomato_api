const express = require('express');
const app = express();
const routes = app.use(express.Router());
const { auth } = require('../middleware/auth');
const restaurant = require('../controller/restaurant_controller');


routes.post('/login', restaurant.login);
routes.post('/changepassword',auth,restaurant.changePassword)
routes.put('/updateRestaurant',auth, restaurant.updateRestaurant);
routes.delete('/deleteRestaurant',auth, restaurant.deleteRestaurant);

exports.routes = routes; 