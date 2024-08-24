const router = require('express').Router()
const {commonMiddlewares} = require('../Middlewares')
const commonController = require('../Controllers/Common.Controller')

// Get Branch
router.get(
    '/branch',
    commonMiddlewares.isLoggedIn,
    commonController.getEmployeeInfo
)

module.exports = router