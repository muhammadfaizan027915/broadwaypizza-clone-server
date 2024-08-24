const router = require('express').Router() 
const {openController} = require('../Controllers')
const {commonMiddlewares} = require('../Middlewares')


router.get(
    '/cities',
    openController.getAllCities
)

router.get(
    '/categories',
    openController.getAllCategories
)

router.get(
    '/products',
    openController.getAllProducts
)

router.get(
    '/products/:productId',
    openController.getProductInfo
)

router.get(
    '/:categoryId/products',
    commonMiddlewares.checkCategoryId,
    openController.getAllCategoryProducts
)

router.get(
    '/:cityId/branches',
    commonMiddlewares.checkCityId,
    openController.getAllCityBranches
)

router.get(
    '/:cityId/locations',
    commonMiddlewares.checkCityId,
    openController.getAllCityLocations
)

router.get(
    '/banners',
    openController.getAllBanners
)

module.exports = router