const QRGROUP = require('../model/qrCodeGroup_model')
const response = require('../helper/response');
const message = require('../helper/message')
const { body, validationResult } = require('express-validator');

exports.createGroup = [
    body('group_type').isLength({ min: 3, max: 50 }).withMessage(message.GROUP_TYPE_MUST_BE_ATLEAST_3_CHARACTER),
    body('group_name').isLength({ min: 3, max: 50 }).withMessage(message.GROUP_NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('arabic_group_name').isLength({ min: 3, max: 50 }).withMessage(message.ARABIC_GROUP_NAME_MUST_NOT_EMPTY),
    async (req, res) => {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return response.errorResponse(res, result.array()[0].msg);
            } else {
                let { group_type, group_name, arabic_group_name } = req.body
                let data = {
                    group_type: group_type,
                    group_name: group_name,
                    arabic_group_name: arabic_group_name,
                    restaurant_id: req.currentUser
                }
                const v = await QRGROUP.insertMany([data]);
                return response.successResponse(res, message.ADD_OGROUP_SUCCESSFULLY);
            }
        } catch {
            response.errorResponse(res, message.INTERNAL_ERROR)
        }
    }
]

exports.getgroup = async (req, res) => {
    try {
        let data = await QRGROUP.find({ restaurant_id: req.currentUser })
        console.log(data)
        if (data.length > 0) {
            return response.successDataResponse(res, data)
        }
        return response.noDataResponse(res, message.NO_DATA_FOUND)

    } catch {
        return response.errorResponse(res, message.INTERNAL_ERROR)
    }
}

exports.getgroupbyID = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await QRGROUP.findOne({ _id: id })
        if (data) {
            return response.successResponseWithData(res, data, "GROUP")
        }
        return response.noDataResponse(res, message.NO_DATA_FOUND)
    } catch {
        return response.errorResponse(res, message.INTERNAL_ERROR)
    }
}

exports.deleteGroup = async (req, res) => {
    try {
        let id = req.params.id;
        await QRGROUP.deleteOne({ _id: id })
        return response.successResponse(res, message.DATA_DELETED_SUCCESSFULLY)
    } catch {
        return response.errorResponse(res, message.INTERNAL_ERROR)
    }
}

exports.updateGroup = [
    body('group_type').optional().isLength({ min: 3, max: 50 }).withMessage(message.GROUP_TYPE_MUST_BE_ATLEAST_3_CHARACTER),
    body('group_name').optional().isLength({ min: 3, max: 50 }).withMessage(message.GROUP_NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('arabic_group_name').optional().isLength({ min: 3, max: 50 }).withMessage(message.ARABIC_GROUP_NAME_MUST_NOT_EMPTY),
    async (req, res) => {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return response.errorResponse(res, result.array()[0].msg);
            } else {
                let id = req.params.id
                let { group_type, group_name, arabic_group_name } = req.body
                let data = {
                    group_type: group_type,
                    group_name: group_name,
                    arabic_group_name: arabic_group_name
                }
                await QRGROUP.updateOne({ _id: id }, data, { new: true });
                return response.successResponse(res, message.Group_UPDATED_SUCCESSFULLY);
            }
        } catch {
            return response.errorResponse(res, message.INTERNAL_ERROR)

        }
    }
]


exports.changeStatus = async (req, res) => {
    try {
        let id = req.params.id
        let data = await QRGROUP.findOne({ _id: id })
        if (data) {
            if (data.status == false) {
                await QRGROUP.updateOne({ _id: id }, { $set: { status: true } })
            } else {
                await QRGROUP.updateOne({ _id: id }, { $set: { status: false } })
            }
            return response.successResponse(res, message.STATUS_UPDATED_SUCCESSFULLY);
        }
        return response.noDataResponse(res, message.NO_DATA_FOUND)
    } catch {
        return response.errorResponse(res, message.INTERNAL_ERROR)
    }
}