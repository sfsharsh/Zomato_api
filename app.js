const express = require('express');
const path = require('path');
const app = express();
const cors=require('cors');
require('dotenv').config();
const swaggerUI = require("swagger-ui-express");
const swaggerJSDocs = require("./swagger/swagger.json");
app.use(express.json());
app.use(cors());
app.use(cors({
    origin:'*',
    credentials:true,
}));
require('./config/connection');

const userRoutes = require('./routes/user_routes');
const restaurantRoutes = require('./routes/restaurant_routes');
const menuRoutes = require('./routes/menu_routes');
const sectionRoutes = require('./routes/section_routes');
const sectionItemRoutes = require('./routes/sectionItem_routes');
const orderRoutes = require('./routes/order_routes');
const modifierRoutes = require('./routes/modifier_routes');
const qrgroupRoutes= require('./routes/orderMenu_group_Routes')
const qrCodes= require('./routes/qrCodes_Routes')
const subUserRoutes= require('./routes/userManagement_routes')


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs)); 
app.use('/user', userRoutes.routes);
app.use('/menu', menuRoutes.routes);
app.use('/menu', sectionRoutes.routes);
app.use('/menu',sectionItemRoutes.routes);
app.use('/menu',modifierRoutes.routes);
app.use('/order',orderRoutes.routes);
app.use('/restaurant', restaurantRoutes.routes);
app.use('/restaurant', subUserRoutes.routes);
app.use('/qr', qrgroupRoutes.routes);
app.use('/qr', qrCodes.routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is connected on ${PORT}`)
})