const Models = require("../Models");

const getOrder = (_id) => {
  return Models.Order.findById(_id, "-branchId")
    .populate({
      path: "customerId",
      select: "name phone -_id",
    })
    .populate({
      path: "deliveredBy",
      select: "userId",
      populate: {
        path: "userId",
        select: "name phone -_id",
      },
    })
    .populate({
      path: "deliveryAddress",
      select: "-_id -__V",
      populate: {
        path: "cityId locationId",
        select: "name -_id",
      },
    })
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        select: "name image price",
      },
    });
};

const getEmployee = (userId) => {
  return Models.Employee.findOne({ userId }, "branchId").populate(
    "userId",
    "name role -_id"
  );
};

module.exports = {
  getOrder,
  getEmployee,
};
