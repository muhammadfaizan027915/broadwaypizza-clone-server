const Models = require("../Models");

const getAcceptedOrders = (branchId) => {
  return Models.Order.find(
    {
      status: "cooked",
      branchId: branchId,
      orderType: "delivery",
    },
    "_id paymentMethod orderType"
  )
    .populate("customerId", "name")
    .populate({
      path: "deliveryAddress",
      select: "-_id",
      populate: {
        path: "locationId cityId",
        select: "name -_id",
      },
    });
};

const getUnderDeliveryOrders = (riderId) => {
  return Models.Order.find(
    {
      status: {
        $not: {
          $in: ["accepted", "pending", "delivered", "cancelled", "cooked"],
        },
      },
      deliveredBy: riderId,
      orderType: "delivery",
    },
    "_id total status orderItems"
  ).populate({
    path: "deliveryAddress",
    select: "-_id",
    populate: {
      path: "cityId locationId",
      select: "name -_id",
    },
  }).populate({
    path: "orderItems",
    populate: {path: "product", select: "name -_id"}
  });
};

const getRiderOrders = (riderId, from, to, page, size) => {
  to = new Date(to)
  to = new Date(to).setDate(to.getDate() + 1)
  console.log(riderId)
  return Models.Order.find({
    deliveredBy: riderId,
    status: "delivered",
    createdAt: { $gte: from, $lte: to },
  })
    .select("paymentMethod orderType status total")
    .populate("customerId", "name -_id")
    .skip((page - 1) * size)
    .limit(size);
};

const acceptOrder = (orderId, riderId) => {
  return Models.Order.findByIdAndUpdate(
    orderId,
    {
      deliveredBy: riderId,
      stauts: "one the way",
    },
    { new: true, useFindAndModify: false }
  ).select("_id");
};

const updateStatus = (orderId, _status) => {
  return Models.Order.findByIdAndUpdate(
    orderId,
    { $set: { status: _status } },
    { new: true, useFindAndModify: false }
  )
    .select("_id total status orderItems")
    .populate({
      path: "deliveryAddress",
      select: "-_id",
      populate: {
        path: "cityId locationId",
        select: "name -_id",
      },
    });
};

module.exports = {
  getAcceptedOrders,
  getUnderDeliveryOrders,
  getRiderOrders,
  acceptOrder,
  updateStatus,
};
