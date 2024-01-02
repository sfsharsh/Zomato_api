const SECTION = require('../model/section_model');
const MENU = require('../model/menu_model');
const message = require('../helper/message');
const response = require('../helper/response');
const { body, validationResult } = require('express-validator');

exports.getMenu = async (req, res) => {
    const menu = await MENU.find({ restaurant_id: req.currentUser })
    res.json(menu)
}

exports.addSection = [
    body('section_name').isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('ar_section_name').isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('menu_id').notEmpty().withMessage(message.MENUID_MUST_NOT_EMPTY),
    body('desc').isLength({ min: 10, max: 100 }).withMessage(message.DESC_MUST_BE_ATLEAST_10_CHARACTER),
    body('ar_desc').isLength({ min: 10, max: 100 }).withMessage(message.DESC_MUST_BE_ATLEAST_10_CHARACTER),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { section_name, ar_section_name, menu_id, desc, ar_desc } = req.body
            let arr = [];
            for (let i = 0; i < req.files.length; i++) {
                arr.push(req.files[i].originalname)
            }
            let data = {
                restaurant_id: req.currentUser,
                section_name: section_name,
                ar_section_name: ar_section_name,
                image: arr,
                desc: desc,
                ar_desc: ar_desc,
                menu_id: menu_id
            }
            const v = await SECTION.insertMany([data]);
            return response.successResponseWithData(res, v, message.DATA_INSERTED_SUCCESSFULLY)
        }
    }];

exports.getSection = async (req, res) => {
    const section = await SECTION.find({ restaurant_id: req.currentUser })
    res.json(section)
}

exports.getSectionById = async (req, res) => {
    const id = req.params.id;
    const section = await SECTION.find({ _id: id });
    const menuId = section[0].menu_id
    const menu = await MENU.find({ _id: menuId })
    res.json({ 'section': section, 'menu': menu })
}

exports.updateSection = [
    body('section_name').optional().isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('ar_section_name').optional().isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('menu_id').notEmpty().withMessage(message.MENUID_MUST_NOT_EMPTY),
    body('desc').optional().isLength({ min: 10, max: 100 }).withMessage(message.DESC_MUST_BE_ATLEAST_10_CHARACTER),
    body('ar_desc').optional().isLength({ min: 10, max: 100 }).withMessage(message.DESC_MUST_BE_ATLEAST_10_CHARACTER),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { section_name, ar_section_name, menu_id, desc, ar_desc } = req.body
            let id = req.params.id;
            const v = await SECTION.find({ _id: id })
            if (v.length > 0) {
                let arr = [];
                for (let i = 0; i < req.files.length; i++) {
                    arr.push(req.files[i].originalname)
                }
                let data = {
                    section_name: section_name,
                    ar_section_name: ar_section_name,
                    image: arr,
                    desc: desc,
                    ar_desc: ar_desc,
                    menu_id: menu_id
                }
                await SECTION.updateOne({ _id: id }, data, { new: true });
                return response.successResponse(res, message.SECTION_MODIFIED_SUCCESSFULLY)
            } else {
                return response.errorResponse(res, message.DATA_NOT_FOUND)
            }
        }
    }];

exports.changesectionstatus = async (req, res) => {
    let id = req.params.id;
    let { section_status } = req.body;
    const v = await SECTION.find({ _id: id })
    if (v.length > 0) {
        let data = { section_status: section_status }
        const v = await SECTION.updateOne({ _id: id }, data, { new: true });
        return response.successResponseWithData(res, v, message.SECTION_UPDATED_SUCCESSFULLY);
    } else {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    }
};
exports.deleteSection = async (req, res) => {
    let id = req.params.id
    const d = await SECTION.deleteOne({ _id: id })
    if (!d.deletedCount) {
        return response.errorResponse(res, message.ERROR_DELETING_SECTION)
    } else {
        return response.successResponse(res, message.SECTION_DELETED)
    }
}