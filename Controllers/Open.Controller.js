const utils = require('../Utils/open.utils')

const getAllCities = async (req, res) => {  

    const cities = await utils.getCities()
    if(!cities.length){
        return res.status(404).send({
            cities: [],
            message: 'No any city found!'
        })
    }

    return res.status(200).send({
        cities,
        message: `${cities.length} cities found!`
    })
}

const getAllCategories = async (req, res) => {

    const categories = await utils.getCategories()
    if(!categories.length){
        return res.status(404).send({
            categories: [],
            message: 'No any category found!'
        })
    }

    return res.status(200).send({
        categories,
        message: `${categories.length} categories found!`
    })
}

const getAllProducts = async (req, res) => {

    const products = await utils.getProducts()
    if(!products.length){
        return res.status(404).send({
            products: [],
            message: 'No any product found!'
        })
    }

    return res.status(200).send({
        products,
        message: `${products.length} products found!`
    })
}

const getProductInfo = async (req, res) => {
    const {productId} = req.params 
    const product = await utils.getProduct(productId)

    if(!product)
        return res.status(404).send({
            product: {},
            message: 'No any product found!'
        })

    return res.status(200).send({
        product,
        message: `Products found for ${productId}!`
    })
}

const getAllBanners = async (req, res) => {
    
    const banners = await utils.getBanners()
    if(!banners.length){
        return res.status(404).send({
            branches: [],
            message: 'No any banners found!'
        })
    }

    return res.status(200).send({
        banners,
        message: `${banners.length} banners found!`
    })
}

const getAllCategoryProducts = async (req, res) => {
    const {categoryId} = req.params
    const products = await utils.getCategoryProducts(categoryId)
    if(!products.length){
        return res.status(404).send({
            products: [],
            message: 'No any product found for given category!'
        })
    }
    return res.status(200).send({
        products,
        message: `${products.length} products found for given category!`
    })
}

const getAllCityBranches = async (req, res) => {
    const {cityId} = req.params
    const branches = await utils.getCityBranches(cityId)
    if(!branches.length){
        return res.status(404).send({
            branches: [],
            message: 'No any branch found for given city!'
        })
    }

    return res.status(200).send({
        branches,
        message: `${branches.length} branches found for given city!`
    })
}

const getAllCityLocations = async (req, res) => {
    const {cityId} = req.params
    const locations = await utils.getCityLocations(cityId)
    if(!locations.length){
        return res.status(404).send({
            locations: [],
            message: 'No any location found for given city!'
        })
    }

    return res.status(200).send({
        locations,
        message: `${locations.length} locations found for given city!`
    })
}

module.exports = {
    getAllCities,
    getAllCategories,
    getAllProducts,
    getProductInfo,
    getAllCategoryProducts,
    getAllCityBranches,
    getAllCityLocations,
    getAllBanners
}