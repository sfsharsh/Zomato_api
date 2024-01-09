const DISCOUNT = require('../model/discount');
const DISCOUNT_FREE_ITEMS = require('../model/discount_free_items');
const DISCOUNT_ITEM_PRICES = require('../model/discount_item_prices');
const response = require('../helper/response');
const message = require('../helper/message')
const { body, validationResult } = require('express-validator');


exports.createDiscount = [
    body('title').isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('ar_title').isLength({ min: 3, max: 50 }).withMessage(message.NAME_MUST_BE_ATLEAST_3_CHARACTER),
    body('discount_type').notEmpty().withMessage(message.DISCOUNT_TYPE_MUST_NOT_BE_EMPTY),
    body('discription').isLength({ min: 10, max: 100 }).withMessage(message.DESC_MUST_BE_ATLEAST_10_CHARACTER),
    body('ar_discription').isLength({ min: 10, max: 100 }).withMessage(message.DESC_MUST_BE_ATLEAST_10_CHARACTER),
    body('minimum_order_amount').notEmpty().withMessage(message.MINIMUM_ORDER_AMOUNT_MUST_NOT_BE_EMPTY),
    body('maximum_order_amount').notEmpty().withMessage(message.MAXIMUM_ORDER_AMOUNT_MUST_NOT_BE_EMPTY),
    body('discount').notEmpty().withMessage(message.DISCOUNT_MUST_NOT_BE_EMPTY),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { title, ar_title, discount_type, discription, ar_discription, minimum_order_amount, maximum_order_amount, discount } = req.body
            let data = {
                restaurant_id: req.currentUser,
                title: title,
                ar_title: ar_title,
                discount_type: discount_type,
                discription: discription,
                ar_discription: ar_discription,
                minimum_order_amount: minimum_order_amount,
                maximum_order_amount: maximum_order_amount,
                discount: discount
            }
            const v = await DISCOUNT.insertMany([data]);
            return response.successResponse(res, message.ADD_DISCOUNT_SUCCESSFULLY);
        }
    }];

exports.createDiscountFreeItems = [
    body('discount_id').notEmpty().withMessage(message.DISCOUNT_ID_MUST_NOT_BE_EMPTY),
    body('offer_item_id').notEmpty().withMessage(message.OFFER_ITEM_ID_MUST_NOT_BE_EMPTY),
    body('free_item_id').notEmpty().withMessage(message.FREE_ITEM_ID_MUST_NOT_BE_EMPTY),
    body('quantity').notEmpty().withMessage(message.QUANTITY_MUST_NOT_BE_EMPTY),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { discount_id, offer_item_id, free_item_id, quantity} = req.body
            let data = {
                discount_id: discount_id,
                offer_item_id: offer_item_id,
                free_item_id: free_item_id,
                quantity: quantity
            }
            const v = await DISCOUNT_FREE_ITEMS.insertMany([data]);
            return response.successResponse(res, message.ADD_DISCOUNT_SUCCESSFULLY);
        }
    }];

exports.createDiscountItemPrices = [
    body('discount_id').notEmpty().withMessage(message.DISCOUNT_ID_MUST_NOT_BE_EMPTY),
    body('offer_item_id').notEmpty().withMessage(message.OFFER_ITEM_ID_MUST_NOT_BE_EMPTY),
    body('discount').notEmpty().withMessage(message.DISCOUNT_MUST_NOT_BE_EMPTY),
    body('minimum_quantity').notEmpty().withMessage(message.MINIMUM_QUANTITY_MUST_NOT_BE_EMPTY),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return response.errorResponse(res, result.array()[0].msg);
        } else {
            let { discount_id, offer_item_id, discount, minimum_quantity } = req.body
            let data = {
                discount_id: discount_id,
                offer_item_id: offer_item_id,
                minimum_quantity: minimum_quantity,
                discount: discount
            }
            const v = await DISCOUNT_ITEM_PRICES.insertMany([data]);
            return response.successResponse(res, message.ADD_DISCOUNT_SUCCESSFULLY);
        }
    }];


exports.ListRestaurentDiscounts = async (req, res) => {
    const d = await DISCOUNT.find({ restaurant_id: req.currentUser })
    if (!d) {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    } else {
        return response.successResponseWithData(res, d, message.GET_DATA_SUCCESSFULLY)
    }

};
exports.ViewRestaurentDiscounts = async (req, res) => {
    let id = req.query.discount_id
    const d = await DISCOUNT.find({ _id: id })
    if (d.length == 0) {
        return response.errorResponse(res, message.DATA_NOT_FOUND)
    } else {
        return response.successResponseWithData(res, d, message.GET_DATA_SUCCESSFULLY)
    }

};

exports.deleteDiscount = async (req, res) => {
    let id = req.query.discount_id
    const d = await DISCOUNT.deleteOne({ _id: id })
    if (!d) {
        return response.errorResponse(res, message.FAILED_TO_DELETE_DATA)
    } else {
        return response.successResponse(res, message.DATA_DELETED_SUCCESSFULLY)
    }
}