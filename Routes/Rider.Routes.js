const router = require('express').Router()
const {riderController, commonController} = require('../Controllers')
const {commonMiddlewares} = require('../Middlewares')

// Get Deliveries Route
router.get(
    '/deliveries',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isRider,
    ], 
    riderController.ordersToDeliver
)

// Get Under Delivery Route
router.get(
    '/orderstatus',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isRider,
    ],
    riderController.underDeliveryOrder
)

// Get Order History Route
router.get(
    '/orderhistory',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isRider,
    ],
    riderController.orderHistory
)

// Get History Order Detail Route
router.get(
    '/orderhistory/:orderId',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isRider,
    ],
    commonController.getOrderDetails
)

// Update Order Status
router.post(
    '/orderstatus/:orderId',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isRider,
    ],
    riderController.updateOrderStatus
)

// Accept Delivery Order Route
router.post(
    '/deliveries/:orderId',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isRider,
    ],
    riderController.acceptDeliveryOrder
)

module.exports = router