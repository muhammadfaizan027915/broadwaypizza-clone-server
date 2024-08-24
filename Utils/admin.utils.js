const Models = require("../Models/index");
const {
  createUser,
  deleteUser,
  deleteOrders,
  updateUser,
} = require("./user.utils");

// Create City
const createCity = (city) => {
  City = new Models.City(city);

  return City.save()
    .then((city) => city)
    .catch((err) => err);
};

// Create Branch
const createBranch = (branch) => {
  const Branch = new Models.Branch(branch);

  return Branch.save()
    .then((branch) => branch)
    .catch((err) => err);
};

// Create Location
const createLocation = (location) => {
  const Location = new Models.Location(location);
  return Location.save()
    .then((location) => location)
    .catch((err) => err);
};

// Create Category
const createCategory = (category) => {
  const Category = new Models.Category(category);
  return dbCategory
    .save()
    .then((category) => category)
    .catch((err) => err);
};

// Create Product
const createProduct = (product) => {
  const Product = new Models.Product(product);
  return Product.save()
    .then((product) => product)
    .catch((err) => err);
};

// Create Employee
const createEmployee = (employee) => {
  const { name, email, phone, role, password, branchId } = employee;
  return createUser({
    name,
    email,
    phone,
    role,
    password,
  })
    .then(({ _id }) => {
      const Employee = new Models.Employee({
        userId: _id,
        branchId,
      });
      return Employee.save();
    })
    .catch((err) => err);
};

// Create Banner
const createBanner = (banner) => {
  const Banner = new Models.Banner(banner);
  return Banner.save()
    .then((banner) => banner)
    .catch((err) => err);
};

// Get Employee
const getEmployee = (_id) => {
  return Models.Employee.findById(_id)
    .populate({
      path: "userId branchId",
      select: "-password -__v -addressId -favourites -directions -cityId",
    })
    .exec();
};

// Get Employees
const getEmployees = () => {
  return Models.Employee.find({})
    .populate({
      path: "userId",
      select: "-password",
      populate: {
        path: "addressId",
        select: "-_id",
        populate: {
          path: "cityId locationId",
        },
      },
    })
    .populate({
      path: "branchId",
      select: "name -_id",
    })
    .then((employees) => employees)
    .catch((err) => err);
};

// Get Branches
const getBranches = () => {
  return Models.Branch.find({})
    .then((branches) => branches)
    .catch((err) => err);
};

// Get Locations
const getLocations = () => {
  return Models.Location.find({})
    .then((locations) => locations)
    .catch((err) => err);
};

// Delete City
const deleteCity = (_id, name) => {
  return Models.City.deleteOne(
    {
      $or: [{ _id }, { name }],
    },
    { new: true, useFindAndModify: false }
  );
};

// Delete Branch
const deleteBranch = (_id, name) => {
  return Models.Branch.deleteOne(
    {
      $or: [{ _id }, { name }],
    },
    { new: true, useFindAndModify: false }
  );
};

// Delete Branches
const deleteBranches = (cityId) => {
  Models.Branch.find({ cityId }, async (err, branches) => {
    for (const branch of branches) {
      await deleteEmployees(branch._id);
      await deleteLocations(branch._id);
      await deleteOrders(branch._id);
    }
  });

  return Models.Branch.deleteMany(
    { cityId },
    { new: true, useFindAndModify: false }
  );
};

// Delete Location
const deleteLocation = (_id, name) => {
  return Models.Location.deleteOne(
    { $or: [{ _id }, { name }] },
    { new: true, useFindAndModify: false }
  );
};

// Delete Locations
const deleteLocations = (branchId, cityId) => {
  return Models.Location.deleteMany(
    {
      $or: [{ branchId }, { cityId }],
    },
    { new: true, useFindAndModify: false }
  );
};

// DeleteCategory
const deleteCategory = (_id, name) => {
  return Models.Category.deleteOne(
    {
      $or: [{ _id }, { name }],
    },
    { new: true, useFindAndModify: false }
  );
};

// Delete Product
const deleteProduct = (_id, name) => {
  return Models.Product.deleteOne(
    { $or: [{ _id }, { name }] },
    { new: true, useFindAndModify: false }
  );
};

// Delete Banner
const deleteBanner = (_id, image) => {
  return Models.Banner.deleteOne(
    { $or: [{ _id }, { image }] },
    { new: true, userFindAndModify: false }
  );
};

// Delete Products
const deleteProducts = (categoryId) => {
  return Models.Product.deleteMany(
    { categoryId },
    { new: true, useFindAndModify: false }
  );
};

// Delete Employee
const deleteEmployee = (_id, name) => {
  return Models.Employee.deleteOne(
    { $or: [{ _id }, { name }] },
    { new: true, useFindAndModify: false }
  );
};

// Delete Employees
const deleteEmployees = (branchId) => {
  Models.Employee.find({ branchId }, "userId -_id", async (err, users) => {
    if (err) return;

    for (const user of users) {
      await deleteUser(user.userId);
    }
  });

  return Models.Employee.deleteMany(
    { branchId },
    { new: true, useFindAndModify: false }
  );
};

// Delete Addresses
const deleteAddresses = (cityId, locationId) => {
  return Models.Address.deleteMany({
    $or: [{ cityId }, { locationId }],
  });
};

// Update City
const updateCity = (cityId, updatedCity) => {
  return Models.City.findByIdAndUpdate(cityId, updatedCity, {
    new: true,
    useFindAndModify: false,
  });
};

// Update Branch
const updateBranch = (branchId, updatedBranch) => {
  return Models.Branch.findByIdAndUpdate(branchId, updatedBranch, {
    new: true,
    useFindAndModify: false,
  });
};

// Update Location
const updateLocation = (locationId, updatedLocation) => {
  return Models.Location.findByIdAndUpdate(locationId, updatedLocation, {
    new: true,
    useFindAndModify: false,
  });
};

// Update Employee
const updateEmployee = (employeeId, updatedEmployee) => {
  return Models.Employee.findByIdAndUpdate(
    employeeId,
    { branchId: updatedEmployee.branchId },
    { new: true, useFindAndModify: false }
  )
    .then(async (employee) => {
      await updateUser(employee.userId, {
        name: updatedEmployee.name,
        email: updatedEmployee.email,
        phone: updatedEmployee.phone,
        role: updatedEmployee.role,
      });
      return employee.populate("userId branchId", "name email phone role");
    })
    .catch((err) => err);
};

// Update Category
const updateCategory = (categoryId, updatedCategory) => {
  return Models.Category.findByIdAndUpdate(categoryId, updatedCategory, {
    new: true,
    useFindAndModify: false,
  });
};

// Update Product
const updateProduct = (productId, updatedProduct) => {
  return Models.Product.findByIdAndUpdate(productId, updatedProduct, {
    new: true,
    useFindAndModify: false,
  });
};

module.exports = {
  createCity,
  createBranch,
  createLocation,
  createCategory,
  createProduct,
  createEmployee,
  createBanner,
  getEmployee,
  deleteCity,
  deleteBranch,
  deleteLocation,
  deleteCategory,
  deleteProduct,
  deleteBanner,
  deleteEmployee,
  deleteEmployees,
  deleteLocations,
  deleteBranches,
  deleteProducts,
  deleteOrders,
  deleteAddresses,
  updateCity,
  updateBranch,
  updateLocation,
  updateEmployee,
  updateCategory,
  updateProduct,
  getEmployees,
  getBranches,
  getLocations,
};
