import mongoose from 'mongoose';

export const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/timeshub');
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.log('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};
