const router = require('express').Router()
const {adminController, openController} = require('../Controllers')
const {commonMiddlewares} = require('../Middlewares')

// Get All Cities Route
router.get(
    '/cities',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    openController.getAllCities
)

// Get All Branches Route
router.get(
    '/branches',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    adminController.getAllBranches
)

// Get All Locations Route
router.get(
    '/locations',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    adminController.getAllLocations
)

// Get All Employees Route
router.get(
    '/employees',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    adminController.getAllEmployees
)

// Get All Categories Route
router.get(
    '/categories',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    openController.getAllCategories
)

// Get All Products Route
router.get(
    '/products',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    openController.getAllProducts
)

// Get All Banners Route
router.get(
    '/banners',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    openController.getAllBanners
)

// Add New City Route
router.post(
    '/cities/new',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ], 
    adminController.addCity
)  

// Add New Branch Route
router.post(
    '/branches/new',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ], 
    adminController.addBranch
)

// Add New Location Route
router.post(
    '/locations/new',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ], 
    adminController.addLocation
)

// Add New Category Route
router.post(
    '/category/new',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ], 
    adminController.addCategory
)

// Add New Product Route
router.post(
    '/products/new', 
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    adminController.addProduct
)

// Add New Employee Route
router.post(
    '/employees/new',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ], 
    adminController.addEmployee
)

// Add New Banner Route
router.post(
    '/banners/new',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ], 
    adminController.addBanner
)

// Delete City Route
router.delete(
    '/cities/delete',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    adminController.removeCity
)

// Delete Location Route
router.delete(
    '/branches/delete',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    adminController.removeBranch
)

// Delete Location Route
router.delete(
    '/locations/delete',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    adminController.removeLocation
)

// Delete Employee Route
router.delete(
    '/employees/delete',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    adminController.removeEmployee
)

// Delete Category Route
router.delete(
    '/categories/delete',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    adminController.removeCategory
)

// Delete Product Route
router.delete(
    '/products/delete',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    adminController.removeProduct
)

// Delete Banner Route
router.delete(
    '/banners/delete',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    adminController.removeBanner
)

// Edit City Route
router.put(
    '/citites/edit',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    adminController.editCity
)

// Edit Branch Route
router.put(
    '/branches/edit',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    adminController.editBranch
)

// Edit Location
router.put(
    '/locations/edit',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    adminController.editLocation
)

// Edit Employee
router.put(
    '/employees/edit',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    adminController.editEmployee
)


// Edit Category
router.put(
    '/categories/edit',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    adminController.editCategory
)

// Edit Product
router.put(
    '/products/edit',
    [
        commonMiddlewares.isLoggedIn,
        commonMiddlewares.isAdmin
    ],
    adminController.editProduct
)

module.exports = router