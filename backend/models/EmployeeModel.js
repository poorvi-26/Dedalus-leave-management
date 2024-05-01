const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeName: String,
  employeeID: String,
  role: String,
  emailID: String,
  password: String,
  leaves: Object,
});

const Employee = mongoose.model('Employee', employeeSchema,"Employee");

module.exports = Employee;
