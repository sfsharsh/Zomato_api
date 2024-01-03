const ORDER = require('../model/order_model');
const response = require('../helper/response');
const message = require('../helper/message')
const { body, validationResult } = require('express-validator');


exports.addorder = [
    body('customer_name').isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('remark').optional().isLength({ min: 3, max: 50 }).withMessage(message.REMARK_MUST_BE_ATLEAST_3_CHARACTER),
    body('qr_code_id').notEmpty().withMessage(message.QR_CODE_MUST_NOT_BE_EMPTY),
    body('qr_code_group').notEmpty().withMessage(message.QR_CODE_GROUP_MUST_NOT_BE_EMPTY),
    body('order_type').notEmpty().withMessage(message.ORDER_TYPE_MUST_NOT_BE_EMPTY),
    body('phone_number').isLength({ min: 10, max: 10 }).withMessage(message.NUMBER_MUST_BE_10_DIGITS),
    body('country_code').notEmpty().withMessage(message.COUNTRY_CODE_MUST_NOT_BE_EMPTY),
    body('order_items').notEmpty().withMessage(message.COUNTRY_CODE_MUST_NOT_BE_EMPTY),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { customer_name, remark, qr_code_id, qr_code_group, order_type, phone_number, country_code, order_items, special_notes, ar_special_notes, amount, quantity } = req.body
            let data = {
                restaurant_id: req.currentUser,
                customer_name: customer_name,
                remark: remark,
                qr_code_id: qr_code_id,
                qr_code_group: qr_code_group,
                order_type: order_type,
                phone_number: phone_number,
                country_code: country_code,
                order_items: order_items,
                special_notes: special_notes,
                ar_special_notes: ar_special_notes,
                amount: amount,
                quantity: quantity
            }
            const v = await ORDER.insertMany([data]);
            return response.successResponse(res, message.ADD_ORDER_SUCCESSFULLY);
        }
    }];

exports.getorder = async (req, res) => {
    let {order_type}=req.body
    const d = await ORDER.find({$and:[{ restaurant_id: req.currentUser ,order_type:order_type}]})
    if (!d) {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    } else {
        return response.successResponseWithData(res, d, message.GET_DATA_SUCCESSFULLY)
    }

};

exports.getorderById = async (req, res) => {
    const id = req.params.id;
    const d = await ORDER.find({ _id: id })
    if (!d) {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    } else {
        return response.successResponseWithData(res, d, message.GET_DATA_SUCCESSFULLY)
    }

};

exports.updateorder = [
    body('customer_name').optional().isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('remark').optional().isLength({ min: 3, max: 50 }).withMessage(message.REMARK_MUST_BE_ATLEAST_3_CHARACTER),
    body('qr_code_id').optional(),
    body('qr_code_group').optional(),
    body('order_type').optional(),
    body('phone_number').optional().isLength({ min: 10, max: 10 }).withMessage(message.NUMBER_MUST_BE_10_DIGITS),
    body('country_code').optional(),
    body('order_items').optional(),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { customer_name, remark, qr_code_id, qr_code_group, order_type, phone_number, country_code, order_items, special_notes, ar_special_notes, amount, quantity } = req.body
            let id = req.params.id;
            const v = await ORDER.find({ _id: id })
            if (v.length > 0) {
                console.log(req.files[0]);
                let arr = [];
                for (let i = 0; i < req.files.length; i++) {
                    arr.push(req.files[i].originalname)
                }
                let data = {
                    customer_name: customer_name,
                    remark: remark,
                    qr_code_id: qr_code_id,
                    qr_code_group: qr_code_group,
                    order_type: order_type,
                    phone_number: phone_number,
                    country_code: country_code,
                    order_items: order_items,
                    special_notes: special_notes,
                    ar_special_notes: ar_special_notes,
                    amount: amount,
                    quantity: quantity
                }
                const v = await ORDER.updateOne({ _id: id }, data, { new: true });
                return response.successResponseWithData(res, v, message.ORDER_UPDATED_SUCCESSFULLY);
            } else {
                return response.errorResponse(res, message.DATA_NOT_FOUND)
            }
        }
    }];

exports.editorder = async (req, res) => {
    let id = req.params.id;
    let data = req.body;
    try {
        let d = await ORDER.UpdateOne({_id:id}, data, {new: true})
        return response.successResponseWithData(res, d, "Successfully Editing Order")
    } catch (e) {
        return response.errorResponse(res, e)
    }
}


exports.deleteorder = async (req, res) => {
    let id = req.params.id
    const d = await ORDER.deleteOne({ _id: id })
    if (!d) {
        return response.errorResponse(res, message.FAILED_TO_DELETE_DATA)
    } else {
        return response.successResponse(res, message.DATA_DELETED_SUCCESSFULLY)
    }
}