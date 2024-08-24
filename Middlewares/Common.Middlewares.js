const { hasFavourite, removeFavourite } = require("../Utils/user.utils");
const { getProduct } = require("../Utils/open.utils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Models = require("../Models");

const checkIdLength = (_id) => {
  return _id.length < 24;
};

const checkOrderId = (req, res, next) => {
  const orderId = req.params.orderId || req.body.orderId;
  if (checkIdLength(orderId)) {
    return res.status(404).send({
      message: "Invalid order id!",
    });
  }
  next();
};

const checkCityId = (req, res, next) => {
  const cityId = req.params.cityId || req.body.cityId;
  if (cityId && checkIdLength(cityId)) {
    return res.status(404).send({
      message: "Invalid city id!",
    });
  }
  next();
};

const checkCategoryId = (req, res, next) => {
  const categoryId = req.params.categoryId || req.body.categoryId;
  if (categoryId && checkIdLength(categoryId)) {
    return res.status(404).send({
      message: "Invalid category id!",
    });
  }
  next();
};

const checkUserId = (req, res, next) => {
  const userId = req.params.userId || req.body.userId;
  if (userId && checkIdLength(userId)) {
    return res.status(404).send({
      message: "Invalid user id!",
    });
  }
  next();
};

const checkProductId = (req, res, next) => {
  const productId = req.params.productId || req.body.productId;
  if (productId && checkIdLength(productId)) {
    return res.status(404).send({
      message: "Invalid product id!",
    });
  }
  next();
};

const checkBranchId = (req, res, next) => {
  const branchId = req.params.branchId || req.body.branchId;
  if (branchId && checkIdLength(branchId)) {
    return res.status(404).send({
      message: "Invalid branch id!",
    });
  }
  next();
};

const checkRiderId = (req, res, next) => {
  const riderId = req.params.riderId || req.body.riderId;
  if (riderId && checkIdLength(riderId)) {
    return res.status(404).send({
      message: "Invalid rider id!",
    });
  }
  next();
};

const removeFavouriteProduct = async (req, res, next) => {
  const { productId } = req.body;
  const { userId } = req.body;

  if (userId && productId) {
    if ((await hasFavourite(userId, productId)) === true) {
      const user = await removeFavourite(userId, productId);
      return res.status(200).send({
        favourites: user.favourites,
        message: `Successfully removed from favourites!`,
      });
    }
  }

  next();
};

const isAdmin = (req, res, next) => {
  if (req.body.role !== "admin")
    return res.status(401).send({
      message: "Unauthorized user to access!",
    });
  next();
};

const isRider = (req, res, next) => {
  if (req.body.role !== "rider")
    return res.status(401).send({
      message: "Unauthorized user to access!",
    });
  next();
};

const isBranchAdmin = (req, res, next) => {
  if (req.body.role !== "branch admin")
    return res.status(401).send({
      message: "Unauthorized user to access!",
    });
  next();
};

const isCustomer = (req, res, next) => {
  if (req.body.role !== "customer")
    return res.status(401).send({
      message: "Unauthorized user to access!",
    });
  next();
};

const isLoggedIn = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).send({
      user: {},
      message: "Authorization token not provided!",
    });
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err)
      return res.status(403).send({
        user: {},
        message: "Unauthorized access!",
      });
    req.body.userId = decoded.userId;
    req.body.role = decoded.role;
    next();
  });
};

const confirmPassword = async (req, res, next) => {
  const { userId, currentPassword } = req.body;
  try {
    const { password } = await Models.User.findById(userId, "password");
    const verify = await bcrypt.compare(currentPassword, password)
    if (!verify) 
      return res.status(403).send({ message: "Incorrect current password!" });
    next();
  } catch (error) {
    return res.status(403).send({ message: "Failed to change password!" });
  }
};

module.exports = {
  checkOrderId,
  checkCityId,
  checkCategoryId,
  checkUserId,
  checkProductId,
  checkBranchId,
  checkRiderId,
  removeFavouriteProduct,
  isLoggedIn,
  isAdmin,
  isBranchAdmin,
  isRider,
  isCustomer,
  confirmPassword,
};
