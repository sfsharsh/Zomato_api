const express = require('express');
const app = express();
const routes = app.use(express.Router());
const discount = require('../controller/discount_controller');
const { auth } = require('../middleware/auth');


routes.post('/createDiscount',auth, discount.createDiscount);
routes.post('/createDiscountFreeItems',auth, discount.createDiscountFreeItems);
routes.post('/createDiscountItemPrices',auth, discount.createDiscountItemPrices);
routes.get('/getDiscount',auth, discount.getDiscount);

exports.routes = routes;