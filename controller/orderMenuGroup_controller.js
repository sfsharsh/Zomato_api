const QRGROUP = require('../model/qrCodeGroup_model')
const response = require('../helper/response');
const message = require('../helper/message')
const { body, validationResult } = require('express-validator');

exports.createGroup = [
    body('group_type').isLength({ min: 3, max: 50 }).withMessage(message.GROUP_TYPE_MUST_BE_ATLEAST_3_CHARACTER),
    body('group_name').isLength({ min: 3, max: 50 }).withMessage(message.GROUP_NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('arabic_group_name').isLength({ min: 3, max: 50 }).withMessage(message.ARABIC_GROUP_NAME_MUST_NOT_EMPTY),
    async (req, res) => {
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
            return response.successResponse(res,message.ADD_OGROUP_SUCCESSFULLY);
        }
    }
]