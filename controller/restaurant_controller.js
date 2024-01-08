const RESTAURANT = require('../model/restaurant_model');
const FEEDBACK = require('../model/feedback_model');
const message = require('../helper/message')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const response = require('../helper/response');
const bcrypt = require('bcrypt');


exports.login = [
    body('email').isEmail().withMessage(message.EMAIL_MUST_VALID),
    body("password").isLength({ min: 8 }).withMessage(message.PASSWORD_MUST_MIN_8_CHARACTER),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { email, password } = req.body
            console.log(email,password);
            const v = await RESTAURANT.findOne({ email: email });
            if (!v) {
                return response.errorResponse(res, message.WRONG_EMAIL)
            } else {
                await bcrypt.compare(password, v.password, (err, rem) => {
                    if (err) {
                        console.log(err);
                        return response.errorResponse(res, message.ERROR)
                    }
                    if (rem && email == v.email) {
                        const token = jwt.sign({ id: v.id }, process.env.SECRET);
                        return response.successResponseWithToken(res, token, message.LOGIN_SUCCESSFULLY);
                    } else {
                        return response.successResponse(res, message.INCORRECT_PASSWORD);
                    }
                })
            }
        }
    }];

exports.forgotPassword = [
    body('email').isEmail().withMessage(message.EMAIL_MUST_VALID),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            var user = await RESTAURANT.findOne({ email: req.body.email });
            if (!user) {
                return response.errorResponse(res, message.USER_NOT_FOUND);
            }
        }
    }];

exports.changePassword = [
    body('oldPassword').isLength({ min: 8 }).withMessage(message.PASSWORD_MUST_MIN_8_CHARACTER),
    body('password').isLength({ min: 8 })
        .exists({ checkFalsy: true }).withMessage(message.PASSWORD_MUST_MIN_8_CHARACTER),
    body('confirmedPassword').isLength({ min: 8 })
        .exists({ checkFalsy: true }).withMessage(message.CONFIRM_PASSWORD_MUST_MIN_8_CHARACTER)
        .custom((value, { req }) => value === req.body.password).withMessage(message.PASSWORD_DO_NOT_MATCH),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { oldPassword, password } = req.body
            let id = req.currentUser
            const v = await RESTAURANT.findOne({ _id: id });
            bcrypt.compare(oldPassword, v.password, async (err, rem) => {
                if (err) {
                    return response.errorResponse(res, message.ERROR)
                }
                if (rem) {
                    const rounds = 10;
                    const hash = await bcrypt.hash(password, rounds);
                    let data = {
                        password: hash
                    }
                    const v1 = await RESTAURANT.updateOne({ _id: id }, data, { new: true });
                    return response.successResponseWithData(res, v1, message.PASSWORD_CHANGE_SUCCESSFULLY)
                } else {
                    return response.errorResponse(res, message.OLDPASSWORD_WRONG)

                }
            })
        }
    }]

exports.updateRestaurant = async (req, res) => {
    let data = req.body
    let id = req.currentUser
    const v = await RESTAURANT.updateOne({ _id: id }, data, { new: true });
    if (!v) {
        return response.errorResponse(res, message.UNAUTHORIZED_USER)
    } else {
        return response.successResponseWithData(res, v, message.RESTAURANT_UPDATED_SUCCESSFULLY)
    }
};

exports.deleteRestaurant = async (req, res) => {
    let id = req.currentUser
    const v = await RESTAURANT.findByIdAndDelete(id)
    if (!v) {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    } else {
        return response.successResponse(res,message.DATA_DELETED_SUCCESSFULLY)
    }
}

exports.ListFeedbacks = async (req, res) => {
    const d = await FEEDBACK.find({ restaurant_id: req.currentUser })
    if (!d) {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    } else {
        return response.successResponseWithData(res, d, message.GET_DATA_SUCCESSFULLY)
    }

};

exports.searchFeedback = async (req, res) => {
    const key = req.query.search;
    const d = await FEEDBACK.find({
      $or: [
        { "thoughts": { $regex: key, '$options' : 'i' } },
        { "rate_of_exeperience": { $regex: key, '$options' : 'i' } }  
      ]
    })
    if (d.length==0) {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    } else {
        return response.successResponseWithData(res, d, message.GET_DATA_SUCCESSFULLY)
    }

};
