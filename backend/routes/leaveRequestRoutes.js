const express = require('express');
const router = express.Router();
const leaveRequestController = require('../controllers/LeaveRequestController');

// Route to add a new leave request
router.post('/add-new', leaveRequestController.addNewLeaveRequest);

// Route to list all leave requests
router.post('/list-all', leaveRequestController.listAllLeaveRequests);

// Route to get Details of particular request
router.get('/get-request/:requestId', leaveRequestController.getRequestData);

// Route to review a leave request
router.put('/review', leaveRequestController.reviewLeaveRequest);

module.exports = router;
