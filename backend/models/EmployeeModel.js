const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeName: String,
  employeeID: String,
  role: String,
  emailID: String,
  password: String,
  department: String,
  designation: String,
  joiningDate: String,
});

const Employee = mongoose.model('Employee', employeeSchema,"Employee");

module.exports = Employee;
