const router = require("express").Router();
const { commonController, branchAdminController } = require("../Controllers");
const { commonMiddlewares } = require("../Middlewares");

// Live Orders Route
router.get(
  "/liveorders",
  [commonMiddlewares.isLoggedIn, commonMiddlewares.isBranchAdmin],
  branchAdminController.getLiveOrders
);

// Live Order Detail Route
router.get(
  "/liveorders/:orderId",
  [
    commonMiddlewares.isLoggedIn,
    commonMiddlewares.isBranchAdmin,
    commonMiddlewares.checkOrderId,
  ],
  commonController.getOrderDetails
);

// Branch Orders History Route
router.get(
  "/orderhistory",
  [
    commonMiddlewares.isLoggedIn,
    commonMiddlewares.isBranchAdmin,
    commonMiddlewares.checkBranchId,
  ],
  branchAdminController.getBranchOrderHistory
);

// Branch History Order Detail Route
router.get(
  "/orderhistory/:orderId",
  [
    commonMiddlewares.isLoggedIn,
    commonMiddlewares.isBranchAdmin,
    commonMiddlewares.checkBranchId,
  ],
  commonController.getOrderDetails
);

// Riders Route
router.get(
  "/riders",
  [
    commonMiddlewares.isLoggedIn,
    commonMiddlewares.isBranchAdmin,
    commonMiddlewares.checkBranchId,
  ],
  branchAdminController.getAllRiders
);

router.get(
  "/riders/:riderId",
  [
    commonMiddlewares.isLoggedIn,
    commonMiddlewares.isBranchAdmin,
    commonMiddlewares.checkRiderId,
  ],
  branchAdminController.getRiderInfo
);

// Update Live Order Route
router.put(
  "/liveorders/:orderId",
  [
    commonMiddlewares.isLoggedIn,
    commonMiddlewares.isBranchAdmin,
    commonMiddlewares.checkOrderId,
  ],
  branchAdminController.updateOrderStatus
);

module.exports = router;
