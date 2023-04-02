import mongoose, { Connection } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<Connection> => {
  const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/BeforeYouPlayDev');

  console.log(`MongoDB Connected: ${conn.connection.host}`);
  return conn.connection;
};

export default connectDB;
