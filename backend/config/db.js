import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // הדגלים הבאים מומלצים לאובדן תקלות
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error:`, error);
    process.exit(1);
  }
};

export default connectDB;
