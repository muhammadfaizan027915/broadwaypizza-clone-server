const Models = require("../Models");

const updateStatus = (orderId, _status) => {
  return Models.Order.findByIdAndUpdate(
    orderId,
    { $set: { status: _status } },
    { new: true, useFindAndModify: false }
  )
    .select("paymentMethod orderType status total")
    .populate("customerId", "name");
};

const liveOrders = (branchId) => {
  return Models.Order.find(
    {
      status: {
        $not: {
          $in: ["delivered", "picked up", "cancelled"],
        },
      },
      branchId: branchId,
    },
    "paymentMethod orderType status total"
  ).populate("customerId", "name");
};

const getBranchOrders = (branchId, from, to, page, size) => {
  to = new Date(to);
  to = new Date(to.setDate(to.getDate() + 1));
  return Models.Order.find({
    branchId,
    status: { $in: ["delivered", "cancelled", "picked up"] },
    createdAt: { $gte: from, $lte: to },
  })
    .select("paymentMethod orderType status total")
    .populate("customerId", "name -_id")
    .skip((page - 1) * size)
    .limit(size);
};

const getRiders = (branchId) => {
  return Models.Employee.find({ branchId }, "userId")
    .populate({
      path: "userId",
      select: "name phone role",
    })
    .populate({ path: "branchId", select: "name -_id" })
    .then((employees) => {
      return employees.filter(({ userId: { role } }) => role === "rider");
    });
};

const getRider = (riderId) => {
  return Models.Employee.findById(riderId)
    .populate({
      path: "branchId",
      select: "name",
      populate: {path: 'cityId', select: 'name'}
    })
    .populate({
      path: "userId",
      select: "-password -favourites -__v",
      populate: {
        path: "addressId",
        select: "userAddress",
        populate: {path: "cityId", select: "name"}
      },
    });
};

module.exports = {
  updateStatus,
  liveOrders,
  getBranchOrders,
  getRiders,
  getRider,
};
