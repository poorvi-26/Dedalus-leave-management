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

    const populatedRequests = await Promise.all(requests.map(async (request) => {
      const employee = await Employee.findOne({ employeeID: request.empID });
      return {
        requestId: request._id,
        employeeName: employee ? employee.employeeName : 'Unknown',
        days: request.days,
        reason: request.reason,
        raisedOn: request.raisedOn,
        type: request.type,
        status: request.status,
      };
    }));

    res.status(200).json(populatedRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to get detail of particular Request
exports.getRequestData = async (req,res) => {
  try{
    const requestId = req.params.requestId;


    // Find the leave request by requestId
    const leaveRequest = await LeaveRequest.findById(requestId);
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    // Find the employee details using empID from the leave request
    const employeeId = leaveRequest.empID;
    const employee = await Employee.findOne({ employeeID: employeeId });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Combine leave request details with employee details
    const result = {
      leaveRequest: leaveRequest,
      employee: employee
    };

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Controller function to review a leave request
exports.reviewLeaveRequest = async (req, res) => {
  try {
    const { requestId, status, employeeId, leaves } = req.body;
    const validStatus = ['approved', 'rejected'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const request = await LeaveRequest.findByIdAndUpdate(requestId, { status }, { new: true });
    if (!request) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    console.log(leaves, employeeId);
    const empRequest = await Employee.findOneAndUpdate({employeeID: employeeId}, {leaves} );
    console.log(empRequest);
    if (!empRequest) {
      return res.status(404).json({ message: 'Unable to update Employee Details'});
    }
    res.status(200).json({ message: 'Request status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
