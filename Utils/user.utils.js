const Models = require("../Models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create User
const createUser = (user) => {
  const User = new Models.User(user);
  return User.save()
    .then((user) => user)
    .catch((err) => err);
};

// Create Address
const createAddress = (userId, address) => {
  Address = new Models.Address(address);
  return Address.save()
    .then((address) => {
      return Models.User.findByIdAndUpdate(
        userId,
        {
          $push: { addressId: address._id },
        },
        { new: true, useFindAndModify: false }
      );
    })
    .catch((err) => err);
};

// Create Order
const createOrder = (order) => {
  const Order = new Models.Order(order);
  return Order.save()
    .then((order) => order)
    .catch((err) => err);
};

// Get Address
const getAddress = (_id) => {
  return Models.User.findById(_id, "addressId")
    .populate({
      path: "addressId",
      populate: {
        path: "cityId locationId",
        select: "-image -branchId -__v -_id",
      },
    })
    .exec();
};

// Get Addresses Array
const getAddressArr = (_id, name) => {
  return Models.User.findOne(
    {
      $or: [{ _id }, { name }],
    },
    "addressId"
  );
};

// Add Favourite
const addFavourite = (userId, productId) => {
  return Models.User.findByIdAndUpdate(
    userId,
    {
      $push: { favourites: productId },
    },
    { new: true, useFindAndModify: false }
  );
};

// Get Profile
const getUser = (_id) => {
  return Models.User.findById(_id, "-password -favourites -__v")
    .populate({
      path: "addressId",
      select: "-__v",
      populate: {
        path: "cityId locationId",
        select: "-image -branchId -__v -_id -cityId",
      },
    })
};

//Get Favourites
const getFavourites = (_id) => {
  return Models.User.findById(_id, "favourites").populate(
    "favourites",
    "-categoryId"
  );
};

// Get Favourites Array
const getFavouritesArr = (_id) => {
  return Models.User.findById(_id, "favourites -_id")
    .then((favourites) => favourites)
    .catch((err) => err);
};

// Get Orders
const getOrders = (_id) => {
  return Models.Order.find(
    { customerId: _id },
    "createdAt paymentMethod status total"
  );
};

// Remove Favourite
const removeFavourite = (userId, productId) => {
  return Models.User.findByIdAndUpdate(
    userId,
    {
      $pull: { favourites: productId },
    },
    { new: true, useFindAndModify: false }
  );
};

// Has Favourite
const hasFavourite = async (userId, productId) => {
  const user_favour = await getFavouritesArr(userId);
  return user_favour ? user_favour.favourites.includes(productId) : false;
};

// Delete User
const deleteUser = (userId) => {
  Models.User.findById(userId, "addressId _id", async (err, user) => {
    if (user) {
      for (const address of user.addressId) {
        await deleteAddress(user._id, address);
      }
      await deleteOrders(undefined, user._id);
    }
  });
  return Models.User.findByIdAndDelete(userId);
};

// Delete Address
const deleteAddress = (userId, _addressId) => {
  Models.User.findByIdAndUpdate(
    userId,
    {
      $pull: { addressId: _addressId },
    },
    { new: true, useFindAndModify: false }
  ).then((user) => user);
  return Models.Address.findByIdAndDelete(_addressId);
};

// Delete Orders
const deleteOrders = (branchId, customerId) => {
  return Models.Order.deleteMany(
    {
      $or: [{ branchId }, { customerId }],
    },
    { new: true, useFindAndModify: false }
  );
};

// Update User
const updateUser = (userId, updatedUser) => {
  return Models.User.findByIdAndUpdate(userId, updatedUser, {
    new: true,
    useFindAndModify: false,
  }).select("name email phone");
};

// Update Password
const updatePassword = (userId, password) => {
  return Models.User.findByIdAndUpdate(
    userId,
    { password },
    { new: true, useFindAndModify: false }
  ).select("_id");
};

// Encrypt Password
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare Password
const verifyPassword = async (email, password) => {
  const user = await Models.User.findOne({ email }, "password");
  const verify = await bcrypt.compare(password, user.password);
  if (verify) return [verify, user._id];
  return [false, undefined];
};

const generateToken = (user) => {
  return jwt.sign(user, process.env.SECRETKEY, { expiresIn: "1h" });
};

module.exports = {
  createUser,
  createAddress,
  createOrder,
  addFavourite,
  getUser,
  getAddress,
  getFavouritesArr,
  getAddressArr,
  getFavourites,
  getOrders,
  hasFavourite,
  removeFavourite,
  deleteUser,
  deleteAddress,
  deleteOrders,
  updateUser,
  updatePassword,
  encryptPassword,
  verifyPassword,
  generateToken,
};
