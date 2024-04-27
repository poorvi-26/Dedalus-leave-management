const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/EmployeeController');

// Route for employee login
router.post('/login', employeeController.employeeLogin);

module.exports = router;