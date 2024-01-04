const SUBUSER = require('../model/userManagement_model');
const PERMISSIONS = require('../model/permissions_model');
const response = require('../helper/response');
const message = require('../helper/message');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');


exports.addSubUser = [
    body('email').isEmail().withMessage(message.EMAIL_MUST_VALID),
    body('first_name').isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('last_name').isLength({ min: 3, max: 100 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('role').notEmpty().withMessage(message.ROLE_MUST_NOT_BE_EMPTY),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { email, first_name, last_name, role } = req.body
            let data = {
                restaurant_id: req.currentUser,
                email: email,
                first_name: first_name,
                last_name: last_name,
                role: role
            }
            const v = await SUBUSER.insertMany([data]);
            return response.successResponse(res, message.ADD_SUBUSER_SUCCESSFULLY);
        }
    }];

exports.getSubUserList = async (req, res) => {
    const d = await SUBUSER.find({ restaurant_id: req.currentUser })
    if (!d) {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    } else {
        return response.successResponseWithData(res, d, message.GET_DATA_SUCCESSFULLY)
    }

};

exports.searchSubUser = async (req, res) => {
    const key = req.body.search;
    const d = await SUBUSER.find({
        $or: [
            { "first_name": { $regex: key, '$options': 'i' } },
            { "last_name": { $regex: key, '$options': 'i' } }
        ]
    })
    if (d.length == 0) {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    } else {
        return response.successResponseWithData(res, d, message.GET_DATA_SUCCESSFULLY)
    }

};

exports.updateSubUser = [
    body('email').optional().isEmail().withMessage(message.EMAIL_MUST_VALID),
    body('first_name').optional().isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('last_name').optional().isLength({ min: 10, max: 100 }).withMessage(message.NAME_MUST_BE_ATLEAST_10_CHARACTER),
    body('role').optional(),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { email, first_name, last_name, role, password } = req.body
            let id = req.params.id;
            const v = await SUBUSER.find({ _id: id })
            if (v.length > 0) {
                const rounds = 10;
                const hash = await bcrypt.hash(password, rounds);
                let data = {
                    email: email,
                    password: hash,
                    first_name: first_name,
                    last_name: last_name,
                    role: role
                }
                const v = await SUBUSER.updateOne({ _id: id }, data, { new: true });
                return response.successResponse(res, message.SUBUSER_UPDATED_SUCCESSFULLY);
            } else {
                return response.errorResponse(res, message.DATA_NOT_FOUND)
            }
        }
    }];


exports.deleteSubUser = async (req, res) => {
    let id = req.params.id
    const d = await SUBUSER.deleteOne({ _id: id })
    if (!d) {
        return response.errorResponse(res, message.FAILED_TO_DELETE_DATA)
    } else {
        return response.successResponse(res, message.DATA_DELETED_SUCCESSFULLY)
    }
}

exports.updatePermissions = [
    body('module_name').isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('status').notEmpty().withMessage(message.STATUS_MUST_NOT_BE_EMPTY),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { module_name, status, } = req.body
            let id = req.params.id;
            const v = await PERMISSIONS.find({ _id: id })
            if (v.length > 0) {
                let data = {
                    restaurant_id: req.currentUser,
                    module_name: module_name,
                    status: status
                }
                const d = await PERMISSIONS.updateMany({}, data, { new: true });
                return response.successResponse(res, message.SUBUSER_UPDATED_SUCCESSFULLY);
            } else {
                return response.errorResponse(res, message.DATA_NOT_FOUND)
            }
        }
    }];
exports.viewPermissions = async (req, res) => {
    const d = await PERMISSIONS.find({ restaurant_id: req.currentUser })
    if (!d) {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    } else {
        return response.successResponseWithData(res, d, message.GET_DATA_SUCCESSFULLY)
    }

};
