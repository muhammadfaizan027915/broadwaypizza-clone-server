const router = require("express").Router();
const { userMiddlewares, commonMiddlewares } = require("../Middlewares");
const { userController, commonController } = require("../Controllers");

// Signup Route
router.post(
  "/signup",
  [userMiddlewares.emailAlreadyUsed],
  userController.signUp
);

// logIn Route
router.post("/login", userController.logIn);

// Add new Address Route
router.post(
  "/profile/addresses/new",
  commonMiddlewares.isLoggedIn,
  userMiddlewares.hasUserId,
  userController.addAddress
);

// Place new Order Route
router.post(
  "/orders/new",
  commonMiddlewares.isLoggedIn,
  userController.addOrder
);

// Add To Favourite Route
router.post(
  "/favourites/new",
  [
    commonMiddlewares.isLoggedIn,
    commonMiddlewares.checkUserId,
    commonMiddlewares.checkProductId,
    commonMiddlewares.removeFavouriteProduct,
  ],
  userController.addToFavourites
);

// Get Profile Details Route
router.get(
  "/profile",
  commonMiddlewares.isLoggedIn,
  commonMiddlewares.checkUserId,
  userController.getUserProfile
);

// Get Addresses Route
router.get(
  "/addresses",
  commonMiddlewares.isLoggedIn,
  commonMiddlewares.checkUserId,
  userController.getUserAddresses
);

// Get Favourites Route
router.get(
  "/favourites",
  commonMiddlewares.isLoggedIn,
  userController.getUserFavourites
);

// Get Orders Route
router.get(
  "/orders",
  commonMiddlewares.isLoggedIn,
  userController.getUserOrders
);

// Get Order Details
router.get(
  "/orders/:orderId",
  commonMiddlewares.isLoggedIn,
  commonController.getOrderDetails
);

// Edit Profile Route
router.put(
  "/profile/edit",
  commonMiddlewares.isLoggedIn,
  userController.editUser
);

router.put(
  "/profile/password/change",
  commonMiddlewares.isLoggedIn,
  commonMiddlewares.confirmPassword,
  userController.editPassword
);

// Delete Address Route
router.delete(
  "/profile/addresses/delete",
  commonMiddlewares.isLoggedIn,
  userController.removeAddress
);

// Delete User Route
router.delete(
  "/profile/delete",
  [commonMiddlewares.isLoggedIn, commonMiddlewares.isCustomer],
  userController.removeUser
);

module.exports = router;
