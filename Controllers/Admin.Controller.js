const utils = require('../Utils/admin.utils')
const { getCity, getBranch, getLocation, getProduct, getCategory, getBanners } = require('../Utils/open.utils')
const { deleteUser, deleteOrders} = require('../Utils/user.utils')

// Controller  addCity
const addCity = async (req, res) => {    
    
    const {name, image} = req.body
    const BASE_URL = 'http://localhost:4000/cities'
    const city = await utils.createCity({
        name,
        image: `${BASE_URL}/${image}`
    })

    if(!city){
        return res.status(404).send({
            city: {},
            message: 'Failed to create city!'
        })
    }

    return res.status(200).send({
        city, 
        message: 'City created successfully!'
    })
}

// Controller addBranch
const addBranch = async (req, res) => {
    
    const {name, address, directions, cityId} = req.body
    const branch = await utils.createBranch({
        name,
        address,
        directions,
        cityId
    })

    if(!branch){
        return res.status(404).send({
            branch: {},
            message: 'Failed to create branch!'
        })
    }

    return res.status(200).send({
        branch, 
        message: 'Branch created successfully!'
    })
}

// Controller addLocation
const addLocation = async (req, res) => {

    const {name, cityId, branchId} = req.body
    const location = await utils.createLocation({
        name,
        branchId,
        cityId
    })

    if(!location){
        return res.status(404).send({
            location: {},
            message: 'Failed to create location!'
        })
    }

    return res.status(200).send({
        location, 
        message: 'Location created successfully!'
    })
}

// Controller addCategory
const addCategory = async (req, res) => {
    const {name} = req.body
    const category = await utils.createCategory({
        name,
    })


    if(!category){
        return res.status(404).send({
            category: {},
            message: 'Failed to create category!'
        })
    }

    return res.status(200).send({
        category, 
        message: 'Category created successfully!'
    })
}

// Controller addProduct 
const addProduct = async (req, res) => {

    const {name, image, description, persons, price, discount, categoryId} = req.body
    const BASE_URL = 'http://localhost:4000/products'
    const product = await utils.createProduct({
        name,
        image: `${BASE_URL}/${image}`,
        description,
        persons,
        price, 
        discount, 
        categoryId
    })


    if(!product){
        return res.status(404).send({
            product: {},
            message: 'Failed to create product!'
        })
    }

    return res.status(200).send({
        product, 
        message: 'Product created successfully!'
    })
}

// Controller addEmplyee
const addEmployee = async (req, res) => {

    const {name, email, phone, role, password, branchId} = req.body
    const {_id} = await utils.createEmployee({
        name,
        email,
        phone,
        role, 
        password,
        branchId
    })

    const employee = await utils.getEmployee(_id)
    
    if(!employee){
        return res.status(404).send({
            employee: {},
            message: 'Failed to create employee!'
        })
    }


    return res.status(200).send({
        employee, 
        message: 'Employee created successfully!'
    })
}

// Controller addBanner
const addBanner = async (req, res) => {

    const {image} = req.body
    const BASE_URL = 'http://localhost:4000/banner'
    const banner = await utils.createBanner({image: `${BASE_URL}/${image}`})

    const _id = banner ? banner._id : undefined
    if(!_id)
        return res.status(404).send({
            banner: {},
            message: 'Failed to create banner!'
        })
    return res.status(200).send({
        banner, 
        message: 'Succesfully created banner!'
    })
}

// Controller removeCity 
const removeCity = async (req, res) => {
    let {cityId, cityName} = req.body
    
    if(cityName && !cityId ){
        const city = await getCity(cityId, cityName)
        if(!city){
            return res.status(404).send({
                message: 'City not found to delete!'
            })
        }
        cityId = city._id
    }

    await utils.deleteBranches(cityId)
    await utils.deleteAddresses(cityId)
    const deletedCity = await utils.deleteCity(cityId, cityName)

    if(!deletedCity.deletedCount ) 
        return res.status(404).send({
            message: 'Failed to delete city!'
        })

    return res.status(202).send({
        message: 'Successfully deleted the city!'
    })
}

// Controller removeBranch
const removeBranch = async (req, res) => {

    let {branchId, branchName} = req.body
    if(branchName && !branchId) {
        const branch  = await getBranch(branchId, branchName)
        if(!branch)
            return res.status(404).send({
                message: 'Branch not found to delete!'
        })
        branchId = branch._id 
    }

    await utils.deleteLocations(branchId)
    await utils.deleteEmployees(branchId)
    await deleteOrders(branchId)

    const deleteBranch = await utils.deleteBranch(branchId, branchName)
    if(!deleteBranch.deteledCount) 
        return res.status(404).send({
            message: 'Failed to delete branch!'
        })

    return res.status(202).send({
        message: 'Successfully deleted the branch!'
    })
}

// Controller removeLocation
const removeLocation = async (req, res) => {

    let {locationId, locationName} = req.body
    if(locationName && !locationId) {
        const location  = await getLocation(locationId, locationName)
        if(!location)
            return res.status(404).send({
                message: 'Location not found to delete!'
        })
        locationId = location._id 
    }

    await utils.deleteAddresses(undefined, locationId)
    const deleteLocation = await utils.deleteLocation(locationId, locationName)

    if(!deleteLocation.deletedCount) 
        return res.status(404).send({
            message: 'Failed to delete location!'
        })

    return res.status(202).send({
        message: 'Successfully deleted the location!'
    })
}

// Controller removeEmployee
const removeEmployee = async (req, res) => {
    const {employeeId} = req.body

    const employee = await utils.getEmployee(employeeId)
    const deletedUser = employee ? await deleteUser(employee.userId) : { _id: undefined }

    if(!deletedUser._id )
        return res.status(404).send({
            message: 'Employee not found to delete!'
        })

    const deletedEmployee = await utils.deleteEmployee(employeeId)
    if(!deletedEmployee.deletedCount)
        return res.status(404).send({
            message: 'Failed to deleted employee!'
        })
        
        
    res.status(202).send({
        message: 'Employee deleted successfully!'
    })
}

// Controller removeCategory
const removeCategory = async (req, res) => {
    let {categoryId, categoryName} = req.body

    if(categoryName && !categoryId) {
        const category  = await getCategory(categoryId, categoryName)
        if(!category)
            return res.status(404).send({
                message: 'Category not found to delete!'
        })
        categoryId = category._id 
    }

    await utils.deleteProducts(categoryId)
    const deletedCategory = await utils.deleteCategory(categoryId)

    if(!deletedCategory.deletedCount)
        return res.status(404).send({
            message: 'Failed to deleted category!'
        })

    res.status(202).send({
        message: 'Category deleted successfully!'
    })
}

// Controller removeProduct
const removeProduct = async (req, res) => {
    let {productId, productName} = req.body

    if(productName && !productId) {
        const product  = await getProduct(productId, productName)
        if(!product)
            return res.status(404).send({
                message: 'Product not found to delete!'
        })
        productId = product._id 
    }

    const deletedProduct = await utils.deleteProduct(productId)
    if(!deletedProduct.deletedCount)
        return res.status(404).send({
            message: 'Failed to deleted product!'
        })

    res.status(202).send({
        message: 'Product deleted successfully!'
    })
}

// Controller removeBanner 
const removeBanner = async (req, res) => {
    const {bannerId, bannerImage} = req.body

    const deletedBanner = await utils.deleteBanner(bannerId, bannerImage)
    if(!deletedBanner.deletedCount)
        return res.status(404).send({
            message: "Failed to delete banner!"
        })
    return res.status(200).send({
        message: "Successfully deleted successfully!"
    })
}

// Controller updateCity
const editCity = async (req, res) => {

    const {cityId, name, image} = req.body 
    const updatedCity = await utils.updateCity(cityId, {
        name, 
        image
    })

    _id = updatedCity ? updatedCity._id : undefined

    if(!_id)
        return res.status(404).send({
            updatedCity: {},
            message: "Failed to update city!"
        })

    return res.status(200).send({
        updatedCity,
        message: 'Successfully updated the city!'
    })
}   

// Controller editBranch
const editBranch = async (req, res) => {
    
    const {branchId, name, directions, address, cityId} = req.body 
    const updatedBranch = await utils.updateBranch(branchId, {
        name, 
        directions,
        address,
        cityId
    })

    _id = updatedBranch ? updatedBranch._id : undefined

    if(!_id)
        return res.status(404).send({
            updatedBranch: {},
            message: "Failed to update branch!"
        })

    return res.status(200).send({
        updatedBranch,
        message: 'Successfully updated the branch!'
    })
}  

// Controller editLocation
const editLocation = async (req, res) => {
    
    const {locationId, name, cityId, branchId} = req.body 
    const updatedLocation = await utils.updateLocation(locationId, {
        name, 
        cityId,
        branchId
    })

    _id = updatedLocation ? updatedLocation._id : undefined

    if(!_id)
        return res.status(404).send({
            updatedLocation: {},
            message: "Failed to update location!"
        })

    return res.status(200).send({
        updatedLocation,
        message: 'Successfully updated the branch!'
    })
} 

// Controller editEmployee
const editEmployee = async (req, res) => {

    const {employeeId, name, email, phone, role, branchId} = req.body 

    const updatedEmployee = await utils.updateEmployee(employeeId, {
        name, 
        email,
        phone,
        role,
        branchId
    })

    _id = updatedEmployee ? updatedEmployee._id : undefined
    console.log(updatedEmployee)
    if(!_id)
        return res.status(404).send({
            updatedEmployee: {},
            message: "Failed to update employee!"
        })

    return res.status(200).send({
        updatedEmployee,
        message: 'Successfully updated the employee!'
    })
}

// Controller editCategory
const editCategory = async (req, res) => {

    const {categoryId, name} = req.body 

    const updatedCategory = await utils.updateProduct(categoryId, {
        name, 
    })

    _id = updatedCategory ? updatedCategory._id : undefined

    if(!_id)
        return res.status(404).send({
            updatedCategory: {},
            message: "Failed to update category!"
        })

    return res.status(200).send({
        updatedCategory,
        message: 'Successfully updated the category!'
    })
}

// Controller editProduct
const editProduct = async (req, res) => {

    const {productId, name, image, description, price, discount, categoryId} = req.body 

    const updatedProduct = await utils.updateProduct(productId, {
        name, 
        image,
        description,
        price,
        discount,
        categoryId
    })

    _id = updatedProduct ? updatedProduct._id : undefined

    if(!_id)
        return res.status(404).send({
            updatedProduct: {},
            message: "Failed to update product!"
        })

    return res.status(200).send({
        updatedProduct,
        message: 'Successfully updated the product!'
    })
}

// Controller getAllEmployees
const getAllEmployees = async (req, res) => {
    
    const employees = await utils.getEmployees()
    if(!employees.length){
        return res.status(404).send({
            employees: [],
            message: 'No any employee found!'
        })
    }

    return res.status(200).send({
        employees,
        message: `${employees.length} employees found!`
    })
}

// Controller getAllLocations
const getAllLocations = async (req, res) => {
    
    const locations = await utils.getLocations()
    if(!locations.length){
        return res.status(404).send({
            locations: [],
            message: 'No any location found!'
        })
    }

    return res.status(200).send({
        locations,
        message: `${locations.length} locations found!`
    })
}

// Controller getAllBranches
const getAllBranches = async (req, res) => {
    
    const branches = await utils.getBranches()
    if(!branches.length){
        return res.status(404).send({
            branches: [],
            message: 'No any branch found!'
        })
    }

    return res.status(200).send({
        branches,
        message: `${branches.length} branches found!`
    })
}



module.exports = {
    addCity,
    addBranch,
    addLocation,
    addCategory,
    addProduct,
    addBanner,
    addEmployee,
    removeCity,
    removeBranch,
    removeEmployee,
    removeLocation,
    removeProduct,
    removeCategory,
    removeBanner,
    editCity,
    editBranch,
    editLocation,
    editEmployee,
    editCategory,
    editProduct,
    getAllEmployees,
    getAllBranches,
    getAllLocations
}