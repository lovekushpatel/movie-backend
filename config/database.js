const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(`\n✅ Connected to MongoDB !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;