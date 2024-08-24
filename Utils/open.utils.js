const Models = require('../Models')

const getCities = () => {
    return Models.City.find({})
        .then(cities => cities)
        .catch(err => err)
}

const getCategories = () => {
    return Models.Category.find({})
        .then(categories => categories)
        .catch(err => err)
}

const getProducts = () => {
    return Models.Product.find({})
        .populate('categoryId')
        .then(products => products)
        .catch(err => err)
}

const getBanners = () => {
    return Models.Banner.find({})
        .then(banners => banners)
        .catch(err => err)
}

const getBanner = (_id, image) => {
    return Models.Banner.findOne({
        $or: [{_id}, {image}]
    })
    .then(Banner => Banner)
    .catch(err => err)
}

const getProduct = (_id, name) => {
    return Models.Product.findOne({
        $or: [{_id}, {name}]
    }).then(product => product)
      .catch(err => err)
}

const getCategory = (_id, name) => {
    return Models.Category.findOne({
        $or: [{_id}, {name}]
    }).then(category => category)
      .catch(err => err)
}

const getCity = (_id, name) => {
    return Models.City.findOne({
        $or: [{name}, {_id}]
    }).then(city => city)
      .catch(err => err)
}

const getBranch = (_id, name) => {
    return Models.Branch.findOne({
        $or: [{name}, {_id}]
    }).then(branch => branch)
      .catch(err => err)
}

const getLocation = (_id, name) => {
    return Models.Location.findOne({
        $or: [{_id}, {name}]
    }).then(location => location)
     .catch(err => err)
}

const getCategoryProducts = (_category) => {
    return Models.Product.find({
        categoryId: _category
    }).then(products => products)
      .catch(err => err)  
}

const getCityBranches = (_city) => {
    return Models.Branch.find({
        cityId: _city
    }).then(branches => branches)
      .catch(err => err)
}

const getCityLocations = (_city) => {
    return Models.Location.find({
        cityId: _city
    }).then(locations => locations)
      .catch(err => err)
}

module.exports = {
    getCities,
    getCategories,
    getProducts,
    getBanners,
    getBanner,
    getCategoryProducts,
    getCityBranches,
    getCityLocations,
    getProduct,
    getCity,
    getBranch,
    getLocation,
    getCategory
}