const jwt = require('jsonwebtoken');
const RESTAURANT = require('../model/restaurant_model');
const response = require('../helper/response');
const message = require('../helper/message')

exports.auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const auth = jwt.verify(token, process.env.SECRET);
        req.currentUser = auth.id;
        const findProfileByid = await RESTAURANT.find({ _id: auth.id });
        if (findProfileByid) {
            next();
        }
        else {
           return response.errorResponse(res,message.UNAUTHORIZED_USER);
        }
    }
    catch (error) {
           return response.errorResponse(res,message.UNAUTHORIZED_USER);
    }
}