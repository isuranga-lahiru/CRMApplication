require('dotenv').config();

const bcryptjs = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = 'admin@example.com';
    const adminPassword = 'password123';

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const hashedPassword = await bcryptjs.hash(adminPassword, 12);

    await User.create({
      email: adminEmail,
      password: hashedPassword,
    });

    console.log('Admin user seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed admin user:', error.message);
    process.exit(1);
  }
};

seedAdmin();
