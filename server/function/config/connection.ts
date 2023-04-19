import mongoose, { Connection } from 'mongoose';

const { connect } = mongoose;

connect(process.env.MONGODB_URI!);

const connection: Connection = mongoose.connection;

export default connection;
