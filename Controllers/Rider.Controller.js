const Models = require("../Models");
const utils = require("../Utils/rider.utils");

const ordersToDeliver = async (req, res) => {
  const { branchId } = req.query;
  try {
    const orders = await utils.getAcceptedOrders(branchId);
    return res.status(200).send({ orders });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const underDeliveryOrder = async (req, res) => {
  const { riderId } = req.query;
  try {
    const orders = await utils.getUnderDeliveryOrders(riderId);
    res.status(200).send({orders});
    return 
  } catch (error) {
    res.status(500).send({message: error})
  }
};

const acceptDeliveryOrder = async (req, res) => {
  const { orderId } = req.params;
  const { riderId } = req.body;
  const acceptedOrder = await utils.acceptOrder(orderId, riderId);

  const _id = acceptedOrder ? acceptedOrder._id : undefined;

  if (!_id)
    return res.status(404).send({
      messege: "Failed to accept order to deliver!",
    });
  return res.status(200).send({
    order: _id,
    message: "Successfully accepted the order to deliver!",
  });
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const updatedOrder = await utils.updateStatus(orderId, status);
  if (!updatedOrder) {
    return res.status(404).send({
      updatedOrder: {},
      message: "Not found order to update status",
    });
  }

  res.status(200).send({
    updatedOrder,
    message: `Status updated for ${orderId}`,
  });
};

const orderHistory = async (req, res) => {
  let { riderId, from, to = Date.now(), page = 1, size = 2 } = req.query;

  if (!from) {
    from = new Date(to);
    from.setMonth(from.getMonth() - 2);
  }

  to = new Date(to);
  try {
    const orders = await utils.getRiderOrders(riderId, from, to, page, size);
    const count = await Models.Order.countDocuments({
      deliveredBy: riderId,
      createdAt: { $gte: from, $lte: new Date(to).setDate(to.getDate() + 1) },
      status: { $in: ["delivered"] },
    });

    if (!orders.length)
      return res.status(404).send({ message: `No any order found!` });

    return res.status(200).send({
      orders,
      from,
      to,
      count,
      message: `${orders.length} orders found!`,
    });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

module.exports = {
  ordersToDeliver,
  underDeliveryOrder,
  acceptDeliveryOrder,
  updateOrderStatus,
  orderHistory,
};
