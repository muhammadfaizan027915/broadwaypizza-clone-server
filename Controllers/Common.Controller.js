const utils = require("../Utils/common.utils");

const getOrderDetails = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await utils.getOrder(orderId);
    if (!order) {
      res.status(404).send({ message: `Order not found!` });
    }
    res.status(200).send({ order, message: `Order found for ${orderId}!` });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getEmployeeInfo = async (req, res) => {
  const { userId } = req.body;

  try {
    const employee = await utils.getEmployee(userId);
    if (!employee)
      return res.status(404).send({
        message: "Cannot read data for given user!",
      });

    return res.status(200).send({
      employee,
      message: "Employee found successfully!",
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = {
  getOrderDetails,
  getEmployeeInfo,
};
