const SECTION = require('../model/section_model');
const MENU = require('../model/menu_model');
const SECTIONITEM = require('../model/sectionItem_model');
const message = require('../helper/message')
const response = require('../helper/response');
const { body, validationResult } = require('express-validator');

exports.getMenu = async (req, res) => {
    const menu = await MENU.find({})
    res.json(menu)
}

exports.getSectionByMenu = async (req, res) => {
    const id = req.params.id;
    const menu = await SECTION.find({ menu_id: id })
    res.json(menu)
}

exports.addSectionItem = [
    body('sectionItem_name').isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('ar_sectionItem_name').isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('menu_id').notEmpty().withMessage(message.MENUID_MUST_NOT_EMPTY),
    body('section_id').notEmpty().withMessage(message.SECTIONID_MUST_NOT_EMPTY),
    body('desc').isLength({ min: 10 }).withMessage(message.DESC_MUST_BE_ATLEAST_10_CHARACTER),
    body('ar_desc').isLength({ min: 10 }).withMessage(message.DESC_MUST_BE_ATLEAST_10_CHARACTER),
    body('allergies').notEmpty().withMessage(message.ALLERGIES_MUST_NOT_EMPTY),
    body('price').notEmpty().withMessage(message.PRICE_MUST_NOT_EMPTY),
    body('recommended_items').notEmpty().withMessage(message.RECOMMENDED_ITEMS_MUST_NOT_EMPTY),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { sectionItem_name, ar_sectionItem_name, menu_id, section_id, desc, ar_desc, mark_section_as_new, mark_section_as_signature, allergies, recommended_items, price } = req.body
            console.log(req.files[0]);
            let arr = [];
            for (let i = 0; i < req.files.length; i++) {
                arr.push(req.files[i].originalname)
            }
            let data = {
                name: sectionItem_name,
                ar_name: ar_sectionItem_name,
                image: arr,
                desc: desc,
                ar_desc: ar_desc,
                menu_id: menu_id,
                section_id: section_id,
                allergies: allergies,
                price: price,
                recommended_items: recommended_items,
                mark_section_as_new: mark_section_as_new,
                mark_section_as_signature: mark_section_as_signature

            }
            const v = await SECTIONITEM.insertMany([data]);
            return response.successResponseWithData(res, v, message.SECTIONITEMS_CREATED_SUCCESSFULLY)
        }
    }];

exports.getSectionItem = async (req, res) => {
    const section = await SECTIONITEM.find({}).limit(5);
    res.json(section)
}

exports.getSectionItemById = async (req, res) => {
    const id = req.params.id;
    const sectionItem = await SECTIONITEM.find({ _id: id });
    const menuId = sectionItem[0].menu_id
    const sectionId = sectionItem[0].section_id
    const section = await SECTION.find({ _id: sectionId })
    const menu = await MENU.find({ _id: menuId })
    res.json({ 'sectionItem': sectionItem, 'section': section, 'menu': menu })
}

exports.updateSectionItem = [
    body('sectionItem_name').optional().isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('ar_sectionItem_name').optional().isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('menu_id').optional(),
    body('section_id').optional(),
    body('desc').optional().isLength({ min: 10, max: 100 }).withMessage(message.DESC_MUST_BE_ATLEAST_10_CHARACTER),
    body('ar_desc').optional().isLength({ min: 10, max: 100 }).withMessage(message.DESC_MUST_BE_ATLEAST_10_CHARACTER),
    body('allergies').optional(),
    body('price').optional(),
    body('recommended_items').optional(),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { sectionItem_name, ar_sectionItem_name, menu_id, section_id, desc, ar_desc, mark_section_as_new, mark_section_as_signature, allergies, recommended_items, price } = req.body
            let id = req.params.id;
            const v = await SECTIONITEM.find({ _id: id })
            if (v.length > 0) {
                console.log(req.files[0]);
                let arr = [];
                for (let i = 0; i < req.files.length; i++) {
                    arr.push(req.files[i].originalname)
                }
                let data = {
                    name: sectionItem_name,
                    ar_name: ar_sectionItem_name,
                    image: arr,
                    desc: desc,
                    ar_desc: ar_desc,
                    menu_id: menu_id,
                    section_id: section_id,
                    allergies: allergies,
                    price: price,
                    recommended_items: recommended_items,
                    mark_section_as_new: mark_section_as_new,
                    mark_section_as_signature: mark_section_as_signature
                }
                await SECTIONITEM.updateOne({ _id: id }, data, { new: true });
                return response.successResponse(res, message.SECTION_ITEM_UPDATED_SUCCESSFULLY)
            } else {
                return response.errorResponse(res, message.DATA_NOT_FOUND)
            }
        }
    }];

exports.changesectionitemstatus = async (req, res) => {
    let id = req.params.id;
    let { sectionitem_status } = req.body;
    const v = await SECTIONITEM.find({ _id: id })
    if (v.length > 0) {
        let data = { sectionitem_status: sectionitem_status }
        const v = await SECTIONITEM.updateOne({ _id: id }, data, { new: true });
        return response.successResponseWithData(res, v, message.SECTION_ITEM_UPDATED_SUCCESSFULLY);
    } else {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    }
};

exports.deleteSectionItem = async (req, res) => {
    let id = req.params.id
    const d = await SECTIONITEM.deleteOne({ _id: id })
    if (!d.deletedCount) {
        return response.errorResponse(res, message.ERROR_DELETING_SECTIONITEM)
    } else {
        return response.successResponse(res, message.DATA_DELETED_SUCCESSFULLY)
    }
}