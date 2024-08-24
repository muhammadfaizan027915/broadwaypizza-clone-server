const Models = require("../Models");
const utils = require("../Utils/branchAdmin.utils");
const riderUtils = require("../Utils/rider.utils");

// Get Live Orders Controller
const getLiveOrders = async (req, res) => {
  const { branchId } = req.query;
  try {
    const liveOrders = await utils.liveOrders(branchId);
    if (!liveOrders.length) {
      res.status(404).send({ message: "No any live order found!" });
      return;
    }
    res.status(200).send({
      liveOrders,
      message: `${liveOrders.length} live orders found!`,
    });
    return;
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// Update Order Status Controller
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await utils.updateStatus(orderId, status);
    if (!updatedOrder) {
      res.status(404).send({
        message: "Not found order to update status",
      });
    }

    res.status(200).send({
      updatedOrder,
      message: `Status updated for ${orderId}`,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// Get All Riders Controller
const getAllRiders = async (req, res) => {
  const { branchId } = req.query;

  try {
    const riders = await utils.getRiders(branchId);
    if (!riders.length)
      return res
        .status(404)
        .send({ message: "No any rider found for given branch!" });

    return res.status(200).send({
      riders,
      message: `${riders.length} riders found for given branch!`,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// Get Rider Info Controller
const getRiderInfo = async (req, res) => {
  const { riderId } = req.params;
  let { from, to = Date.now(), page = 1, size = 2 } = req.query;

  if (!from) {
    from = new Date(to);
    from.setMonth(from.getMonth() - 2);
  }

  to = new Date(to);
  try {
    const rider = await utils.getRider(riderId);
    const orders = await riderUtils.getRiderOrders(
      riderId,
      from,
      to,
      page,
      size
    );

    const count = await Models.Order.countDocuments({
      deliveredBy: rider._id,
      createdAt: { $gte: from, $lte: new Date(to).setDate(to.getDate() + 1) },
      status: { $in: ["delivered"] },
    });

    if (!rider && !orders.length)
      return res
        .status(404)
        .send({ message: `No info found for rider ${riderId}` });

    return res
      .status(200)
      .send({
        rider,
        orders,
        from,
        to,
        count,
        message: `Info found for rider ${riderId}`,
      });
  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }
};

// Get Order History Controller
const getBranchOrderHistory = async (req, res) => {
  let { branchId, from, to = Date.now(), page = 1, size = 2 } = req.query;
  if (!from) {
    from = new Date(to);
    from.setMonth(from.getMonth() - 2);
  }
  to = new Date(to);
  try {
    const orders = await utils.getBranchOrders(branchId, from, to, page, size);
    const count = await Models.Order.countDocuments({
      branchId,
      createdAt: { $gte: from, $lte: new Date(to).setDate(to.getDate() + 1) },
      status: { $in: ["delivered", "cancelled", "picked up"] },
    });
    if (!orders.length) {
      res.status(404).send({ message: `Orders not found for branch` });
      return;
    }
    res.status(200).send({
      orders,
      count,
      from,
      to,
      message: `${orders.length} orders found for branch ${branchId}`,
    });
    return;
  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }
};

module.exports = {
  getLiveOrders,
  updateOrderStatus,
  getAllRiders,
  getRiderInfo,
  getBranchOrderHistory,
};
