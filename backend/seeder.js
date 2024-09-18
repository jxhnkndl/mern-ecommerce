import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear out database before seeding
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Seed users
    const createdUsers = await User.insertMany(users);

    // Capture admin user
    const adminUser = createdUsers[0]._id;

    // Since products required users to have created them and only admin users can create products,
    // add the adminUser to each product before seeding them into the database
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    })

    // Seed products
    await Product.insertMany(sampleProducts);

    console.log('Data successfully imported!'.green.inverse);

    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
}

const destroyData = async () => {
  try {
    // Clear out database before seeding
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data successfully destroyed!'.green.inverse);

    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
}

// Watch for a -d flag on the terminal command to determine whether to create or destroy data
if (process.argv[2] === '-d') {
  destroyData();  // npm run data:destroy
} else {
  importData();   // npm run data:import
}