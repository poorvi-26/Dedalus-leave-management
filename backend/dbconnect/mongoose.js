const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://agarwalpoorvi2604:yYNslIXgYuG7CItc@cluster0.syhuadn.mongodb.net/leave-management';
//mogohost://username:password@cluster


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connection successful');
});


module.exports = mongoose;