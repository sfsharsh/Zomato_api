const MENU = require('../model/menu_model');
const response = require('../helper/response');
const message = require('../helper/message')
const { body, validationResult } = require('express-validator');


exports.addMenu = [
    body('name').isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('ar_name').isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('desc').isLength({ min: 10, max: 100 }).withMessage(message.DESC_MUST_BE_ATLEAST_10_CHARACTER),
    body('ar_desc').isLength({ min: 10, max: 100 }).withMessage(message.DESC_MUST_BE_ATLEAST_10_CHARACTER),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { name, ar_name, desc, ar_desc } = req.body
            console.log(req.files[0]);
            let arr = [];
            for (let i = 0; i < req.files.length; i++) {
                arr.push(req.files[i].originalname)
            }
            let data = {
                restaurant_id: req.currentUser,
                name: name,
                ar_name: ar_name,
                image: arr,
                desc: desc,
                ar_desc: ar_desc
            }
            const v = await MENU.insertMany([data]);
            return response.successResponse(res, message.ADD_MENU_SUCCESSFULLY);
        }
    }];

exports.getMenu = async (req, res) => {
    const d = await MENU.find({ restaurant_id: req.currentUser })
    if (!d) {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    } else {
        return response.successResponseWithData(res, d, message.GET_DATA_SUCCESSFULLY)
    }

};

exports.getMenuById = async (req, res) => {
    const id = req.params.id;
    const d = await MENU.find({ _id: id })
    if (!d) {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    } else {
        return response.successResponseWithData(res, d, message.GET_DATA_SUCCESSFULLY)
    }

};

exports.updateMenu = [
    body('name').optional().isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('ar_name').optional().isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('desc').optional().isLength({ min: 10, max: 100 }).withMessage(message.DESC_MUST_BE_ATLEAST_10_CHARACTER),
    body('ar_desc').optional().isLength({ min: 10, max: 100 }).withMessage(message.DESC_MUST_BE_ATLEAST_10_CHARACTER),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { name, ar_name, desc, ar_desc } = req.body
            let id = req.params.id;
            const v = await MENU.find({ _id: id })
            if (v.length > 0) {
                console.log(req.files[0]);
                let arr = [];
                for (let i = 0; i < req.files.length; i++) {
                    arr.push(req.files[i].originalname)
                }
                let data = {
                    name: name,
                    ar_name: ar_name,
                    image: arr,
                    desc: desc,
                    ar_desc: ar_desc
                }
                const v = await MENU.updateOne({ _id: id }, data, { new: true });
                return response.successResponse(res, message.MENU_UPDATED_SUCCESSFULLY);
            } else {
                return response.errorResponse(res, message.DATA_NOT_FOUND)
            }
        }
    }];

exports.changemenustatus = async (req, res) => {
    let id = req.params.id;
    let { menu_status } = req.body;
    const v = await MENU.find({ _id: id })
    if (v.length > 0) {
        let data = { menu_status: menu_status }
        const v = await MENU.updateOne({ _id: id }, data, { new: true });
        return response.successResponse(res, message.MENU_UPDATED_SUCCESSFULLY);
    } else {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    }
};

exports.deleteMenu = async (req, res) => {
    let id = req.params.id
    const d = await MENU.deleteOne({ _id: id })
    if (!d) {
        return response.errorResponse(res, message.FAILED_TO_DELETE_DATA)
    } else {
        return response.successResponse(res, message.DATA_DELETED_SUCCESSFULLY)
    }
}