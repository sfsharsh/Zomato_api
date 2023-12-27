const USER = require('../model/user_model');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const sib = require('../service/sib')
const uid = require('../service/uid')
const message = require('../helper/message');
const response = require('../helper/response');

exports.signUp = [
    body('email').isEmail().withMessage(message.EMAIL_MUST_VALID),
    async (req, res) => {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res,result.array()[0].msg)
        } else {

            let { email, fullName } = req.body;
            const v = await USER.find({ email: email });
            if (v.length > 0) {
                return response.unAuthorizedResponse(res, message.EMAIL_ALREADY_EXISTS)
            } else {
                let UID = uid()
                console.log(UID)
                let otp = sib.sib(email, fullName)
                let data = {
                    uid: UID,
                    name: fullName,
                    otp: otp
                }
                await USER.insertMany([data])
                return response.successResponseWithUid(res, UID, message.OTP_SEND_SECCUSSFULLY);
                setTimeout(async () => {
                    await USER.deleteOne({ email: email })
                }, 900000)
            }
        }


    }
]
exports.reSendOtp = async (req, res) => {
    let { email } = req.body
    let otp = sib.sib(email)
    let data = {
        email: email,
        otp: otp
    }
    try {
        await USER.updateOne({ email: email }, { $set: { otp: otp } })
        return response.successResponse(res,message.OTP_SEND_SECCUSSFULLY);
        setTimeout(async () => {
            await USER.updateOne({ email: email }, { $set: { otp: "" } })
        }, 900000)
    }
    catch {
        return response.errorResponse(res,message.ERROR);
    }
}
exports.verifyOtp = [
    body('otp').isLength({ min: 6, max: 6 }).withMessage(message.OTP_MUST_BE_6_DIGIT),
    async (req, res) => {
        console.log(req.body)
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res,result.array()[0].msg);
        } else {
            let { uid, otp, email } = req.body
            const v = await USER.find({ $and: [{ uid: uid }, { otp: otp }] });
            if (v.length > 0) {
                const token = jwt.sign({ id: v.id }, "SECRET123", { expiresIn: '10m' });
                await USER.updateOne({ uid: uid }, { $set: { otp: "", verify: true, email: email } })
                return response.successResponseWithToken(res,token,message.OTP_VERIFIED)
            } else {
                return response.errorResponse(res,message.WRONG_OTP);
            }
        }
    }];

exports.login = [
    body('email').isEmail().withMessage(message.EMAIL_MUST_VALID),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res,result.array()[0].msg);
        } else {
            let { email } = req.body
            let otp = sib.sib(email)
            let data = {
                email: email,
                otp: otp
            }
            const v = await USER.find({ email: email });
            if (v.length > 0) {
                const result = await USER.updateOne({ email: email }, data, { new: true });
                return response.successResponse(res,message.OTP_SEND_SECCUSSFULLY);
            } else {
                await USER.insertMany([data])
                return response.successResponse(res,message.OTP_SEND_SECCUSSFULLY);
            }
        }
    }];

exports.updateUser = [
    body('name').isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_DIGIT),
    body('email').isEmail().withMessage(message.EMAIL_MUST_VALID),
    body('address').isLength({ min: 5, max: 50 }).withMessage(message.ADDRESS_MUST_BE_ATLEAST_5_CHARACTER),
    body('phone_number').isLength({ min: 10, max: 10 }).withMessage(message.NUMBER_MUST_BE_10_DIGITS),
    body('gender').notEmpty().withMessage(message.GENDER_MUST_NOT_BE_EMPTY),
    body('age').notEmpty().withMessage(message.AGE_MUST_NOT_EMPTY),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res,result.array()[0].msg);
        } else {
            let data = req.body
            const v = await USER.updateOne({ email: data.email }, data, { new: true });
            res.send(v);
            return response.successResponseWithData(res,v,message.USER_UPDATED_SUCCESSFULLY)
        }
    }];