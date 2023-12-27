const MODIFIER = require('../model/modifier_model');
const response = require('../helper/response');
const message = require('../helper/message')
const { body, validationResult } = require('express-validator');


exports.addmodifier = [
    body('name').isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('ar_name').isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('modifier').notEmpty().withMessage(message.MODIFIER_MUST_NOT_EMPTY),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { name, ar_name, modifier } = req.body
            let data = {
                name: name,
                ar_name: ar_name,
                modifier: modifier
            }
            const v = await MODIFIER.insertMany([data]);
            return response.successResponse(res, v, message.ADD_MODIFIER_SUCCESSFULLY);
        }
    }];

exports.getmodifier = async (req, res) => {
    const d = await MODIFIER.find({})
    if (!d) {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    } else {
        return response.successResponse(res, d, message.GET_DATA_SUCCESSFULLY)
    }

};

exports.getmodifierById = async (req, res) => {
    const id = req.params.id;
    const d = await MODIFIER.find({ _id: id })
    if (!d) {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    } else {
        return response.successResponse(res, d, message.GET_DATA_SUCCESSFULLY)
    }

};

exports.updatemodifier = [
    body('name').optional().isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('ar_name').optional().isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('modifier').optional(),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { name, ar_name, modifier } = req.body
            let id = req.params.id;
            const v = await MODIFIER.find({ _id: id })
            if (v.length > 0) {
                let data = {
                    name: name,
                    ar_name: ar_name,
                    modifier: modifier
                }
                const v = await MODIFIER.updateOne({ _id: id }, data, { new: true });
                return response.successResponseWithData(res, v, message.MODIFIER_UPDATED_SUCCESSFULLY);
            } else {
                return response.errorResponse(res, message.DATA_NOT_FOUND)
            }
        }
    }];

exports.changemodifierstatus = async (req, res) => {
    let id = req.params.id;
    let { modifier_status } = req.body;
    const v = await MODIFIER.find({ _id: id })
    if (v.length > 0) {
        let data = { modifier_status: modifier_status }
        const v = await MODIFIER.updateOne({ _id: id }, data, { new: true });
        return response.successResponseWithData(res, v, message.SECTION_UPDATED_SUCCESSFULLY);
    } else {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    }
};

exports.deletemodifier = async (req, res) => {
    let id = req.params.id
    const d = await MODIFIER.deleteOne({ _id: id })
    if (!d) {
        return response.errorResponse(res, message.FAILED_TO_DELETE_DATA)
    } else {
        return response.successResponse(res, message.DATA_DELETED_SUCCESSFULLY)
    }
}