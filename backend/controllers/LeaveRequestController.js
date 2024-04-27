const LeaveRequest = require('../models/LeaveRequestModel');
const Employee = require('../models/EmployeeModel');

// Controller function to add a new leave request
exports.addNewLeaveRequest = async (req, res) => {
  try {
    const { type, startDate, endDate, days, reason, empID } = req.body;
    const newLeaveRequest = new LeaveRequest({
      type,
      startDate,
      endDate,
      days,
      reason,
      empID,
      status: 'underReview', // Assuming default status is 'underReview'
      raisedOn: new Date(),
    });
    const savedRequest = await newLeaveRequest.save();
    res.status(201).json({ requestID: savedRequest._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to list all leave requests
exports.listAllLeaveRequests = async (req, res) => {
  try {
    const { status } = req.body;
    const filter = status ? { status } : {};

    console.log("filer", filter);
    const requests = await LeaveRequest.find(filter).sort({ raisedOn: -1 });

    console.log("Requests", requests);

    const populatedRequests = await Promise.all(requests.map(async (request) => {
      const employee = await Employee.findOne({ employeeID: request.empID });
      return {
        requestId: request._id,
        employeeId: request.empID,
        employeeName: employee ? employee.employeeName : 'Unknown',
        startDate: request.startDate,
        endDate: request.endDate,
        days: request.days,
        reason: request.reason,
        raisedOn: request.raisedOn,
        type: request.type
      };
    }));

    res.status(200).json(populatedRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to review a leave request
exports.reviewLeaveRequest = async (req, res) => {
  try {
    const { requestId, status } = req.body;
    const validStatus = ['approved', 'rejected'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const request = await LeaveRequest.findByIdAndUpdate(requestId, { status }, { new: true });
    if (!request) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.status(200).json({ message: 'Request status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
