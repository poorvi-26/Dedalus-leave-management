const express = require('express');
const cors = require('cors');
const mongoose = require('./dbconnect/mongoose');
const employeeRoutes = require('./routes/employeeRoutes');
const leaveRequestRoutes = require('./routes/leaveRequestRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/employee', employeeRoutes);
app.use('/leave-requests', leaveRequestRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});