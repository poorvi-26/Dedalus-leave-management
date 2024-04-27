const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  empID: String,
  type: String,
  startDate: Date,
  endDate: Date,
  days: Number,
  status: { type: String, enum: ['approved', 'rejected', 'underReview'] },
  reviewedBy: String,
  reviewedOn: Date,
  reason: String,
  raisedOn: Date,
});

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema,"LeaveRequest");

module.exports = LeaveRequest;
