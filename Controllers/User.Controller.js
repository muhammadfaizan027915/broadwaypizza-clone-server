const { response } = require("express");
const User = require("../Models/User");
const utils = require("../Utils/user.utils");

// signup Controller
const signUp = async (req, res) => {
  let { name, email, phone, role, password } = req.body;
  password = await utils.encryptPassword(password);

  try {
    const user = await utils.createUser({
      name,
      email,
      phone,
      role,
      password,
    });

    const token = utils.generateToken({
      userId: user._id,
      role: user.role,
    });

    return res.status(200).send({
      user: {
        _id: user._id,
        role: user.role,
        favourites: user.favourites,
      },
      token,
      message: "Signed up successfully!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Sign up failed!",
    });
  }
};

// logIn Controller
const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [verify, userId] = await utils.verifyPassword(email, password);
    if (verify) {
      const user = await User.findById(userId, "favourites role");
      const token = utils.generateToken({
        userId: user._id,
        role: user.role,
      });
      res.status(200).send({ user, token, message: "Successfully logged in!" });
      return;
    }
    res.status(404).send({ message: "Wrong email or password!" });
    return;
  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }
};

// addAddress Controller
const addAddress = async (req, res) => {
  const { cityId, locationId, userAddress, userId } = req.body;
  try {
    const user = await utils.createAddress(userId, {
      cityId,
      locationId,
      userAddress,
    });
    const addressId = user ? user.addressId : undefined;
    if (!addressId) {
      return res.status(404).send({
        message: "Faild to add address!",
      });
    }

    const addresses = await utils.getAddress(userId);
    return res.status(200).send({
      addresses,
      message: "Address added successfully!",
    });
  } catch (error) {
    res.stauts(500).send({ message: error });
  }
};

// addOrder Controller
const addOrder = async (req, res) => {
  const {
    customerId,
    branchId,
    deliveryAddress,
    orderNote,
    paymentMethod,
    orderType,
    orderItems,
    total,
  } = req.body;

  try {
    const order = await utils.createOrder({
      customerId,
      branchId,
      deliveryAddress,
      orderNote,
      paymentMethod,
      orderType,
      orderItems,
      total,
    });

    return res
      .status(200)
      .send({ order: order._id, message: "Order placed successfully" });
      
  } catch (error) {
    res.status(500).send({ message: "Faild to place order!" });
    return;
  }
};

// getProfileDetails Controller
const getUserProfile = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await utils.getUser(userId);
    return res.status(200).send({
      user,
      message: `User found for ${userId}!`,
    });
  } catch (error) {
    return res.status(404).send({
      user: {},
      message: `User not found for ${userId}!`,
    });
  }
};

const getUserAddresses = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await utils.getAddress(userId);
    if (!user) {
      res.status(404).send({ message: "Addresses not found!" });
    }
    res.status(200).send({
      addresses: user.addressId,
      message: `${user.addressId.length} addresses found!`,
    });
    return;
  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }
};

// getFavourites Controller
const getUserFavourites = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await utils.getFavourites(userId);
    return res.status(200).send({
      favourites: user.favourites,
      message: `${user.favourites.length} favourite products found!`,
    });
  } catch (error) {
    return res.status(404).send({
      message: "Favourite products not found!",
    });
  }
};

// getUserOrders Controller
const getUserOrders = async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await utils.getOrders(userId);
    if (!orders.length) {
      res.status(404).send({ message: `No any order found!` });
      return;
    }
    res
      .status(200)
      .send({ orders, message: `${orders.length} orders found for ${userId}` });
    return;
  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }
};

// addToFavourites Controller
const addToFavourites = async (req, res) => {
  const { userId, productId } = req.body;
  const user_favour = await utils.addFavourite(userId, productId);

  if (user_favour === null || !user_favour.favourites.includes(productId)) {
    return res.status(404).send({
      favourites: [],
      message: "Failed to add product to favourites!",
    });
  }

  return res.status(200).send({
    favourites: user_favour.favourites,
    message: `Successfully added to favourites!`,
  });
};

// editUser Controller
const editUser = async (req, res) => {
  const { userId, name, email, phone } = req.body;
  try {
    const updatedUser = await utils.updateUser(userId, {
      name,
      email,
      phone,
    });

    return res.status(202).send({
      updatedUser,
      message: "User profile updated successfully!",
    });
  } catch (error) {
    return res.status(404).send({
      message: "Failed to edit user profile!",
    });
  }
};

// removeAddress Controller
const removeAddress = async (req, res) => {
  const { userId, addressId } = req.body;
  try {
    const deletedAddress = await utils.deleteAddress(userId, addressId);
    console.log(deletedAddress);
    if (deletedAddress)
      return res.status(202).send({
        deletedAddress,
        message: "Address deleted successfully!",
      });
    return res.status(404).send({
      message: "Failed to delete address!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Server error!",
    });
  }
};

// removeUser Controller
const removeUser = async (req, res) => {
  const { userId } = req.body;
  const deletedUser = await utils.deleteUser(userId);

  const _id = deletedUser ? deletedUser._id : undefined;

  if (!_id)
    return res.status(404).send({
      message: "Failed to delete user acoount!",
    });

  return res.status(202).send({
    message: "User account deleted successfully!",
  });
};

// editPassword Controller
const editPassword = async (req, res) => {
  let { userId, password } = req.body;
  try {
    password = await utils.encryptPassword(password);
    await utils.updatePassword(userId, password);
    return res.status(202).send({
      message: "Password changed successfully!",
    });
  } catch (error) {
    return res.status(404).send({
      message: "Failed to change password!",
    });
  }
};

module.exports = {
  signUp,
  logIn,
  addAddress,
  addToFavourites,
  addOrder,
  getUserProfile,
  getUserAddresses,
  getUserFavourites,
  getUserOrders,
  editUser,
  editPassword,
  removeAddress,
  removeUser,
};
