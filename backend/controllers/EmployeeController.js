const Employee = require('../models/EmployeeModel');

// Controller function to handle employee login
exports.employeeLogin = async (req, res) => {
  try {
    const { emailID, password } = req.body;
    const employee = await Employee.findOne({ emailID, password });
    console.log(employee);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
