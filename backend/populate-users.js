const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://127.0.0.1:27017/mealplanner')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB error:', err));

const sampleUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    goal: "weight-loss"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com", 
    password: "password123",
    goal: "muscle-gain"
  },
  {
    name: "Mike Johnson",
    email: "mike@example.com",
    password: "password123", 
    goal: "maintenance"
  }
];

async function populateUsers() {
  try {
    await User.deleteMany({});
    await User.insertMany(sampleUsers);
    console.log('✅ Users collection populated');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

populateUsers();