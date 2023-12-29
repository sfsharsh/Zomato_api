const QRCODES = require('../model/qrCodes_model');
const response = require('../helper/response');
const message = require('../helper/message')
const { body, validationResult } = require('express-validator');


exports.addqrcode = [
    body('name').isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('ar_name').isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('qr_code_group_id').notEmpty().withMessage(message.QR_CODE_GROUP_ID_MUST_NOT_BE_EMPTY),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { name, ar_name, qr_code_group_id} = req.body
            console.log(req.files[0]);
            let arr = [];
            for (let i = 0; i < req.files.length; i++) {
                arr.push(req.files[i].originalname)
            }
            let data = {
                name: name,
                ar_name: ar_name,
                qr_code_image: arr,
                qr_code_group_id:qr_code_group_id,
                restaurant_id:req.currentUser
            }
            const v = await QRCODES.insertMany([data]);
            return response.successResponse(res, v, message.ADD_QRCODES_SUCCESSFULLY);
        }
    }];

exports.getqrcode = async (req, res) => {
    const d = await QRCODES.find({ restaurant_id: req.currentUser})
    if (!d) {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    } else {
        return response.successResponseWithData(res, d, message.GET_DATA_SUCCESSFULLY)
    }

};

exports.getqrcodeById = async (req, res) => {
    const id = req.params.id;
    const d = await QRCODES.find({ $and: [{ restaurant_id: req.currentUser }, { _id: id }] })
    if (!d) {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    } else {
        return response.successResponseWithData(res, d, message.GET_DATA_SUCCESSFULLY)
    }

};

exports.updateqrcode = [
    body('name').optional().isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('ar_name').optional().isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('qr_code_group_id').optional(),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { name, ar_name, qr_code_group_id } = req.body
            let id = req.params.id;
            const v = await QRCODES.find({ _id: id })
            if (v.length > 0) {
                console.log(req.files[0]);
                let arr = [];
                for (let i = 0; i < req.files.length; i++) {
                    arr.push(req.files[i].originalname)
                }
                let data = {
                    name: name,
                    ar_name: ar_name,
                    qr_code_image: arr,
                    qr_code_group_id:qr_code_group_id
                }
                const v = await QRCODES.updateOne({ $and: [{ restaurant_id: req.currentUser }, { _id: id }] }, data, { new: true });
                return response.successResponse(res, message.QRCODES_UPDATED_SUCCESSFULLY);
            } else {
                return response.errorResponse(res, message.DATA_NOT_FOUND)
            }
        }
    }];

exports.changeqrcodestatus = async (req, res) => {
    let id = req.params.id;
    let { menu_status } = req.body;
    const v = await QRCODES.find({ _id: id })
    if (v.length > 0) {
    let data = { menu_status: menu_status }
    const v = await QRCODES.updateOne({ $and: [{ restaurant_id: req.currentUser }, { _id: id }] }, data, { new: true });
    return response.successResponse(res, message.QRCODES_UPDATED_SUCCESSFULLY);
    } else {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    }
};

exports.deleteqrcode = async (req, res) => {
    let id = req.params.id
    const d = await QRCODES.deleteOne({ $and: [{ restaurant_id: req.currentUser }, { _id: id }] })
    if (!d) {
        return response.errorResponse(res, message.FAILED_TO_DELETE_DATA)
    } else {
        return response.successResponse(res, message.DATA_DELETED_SUCCESSFULLY)
    }
}