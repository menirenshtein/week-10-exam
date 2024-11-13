import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import mongoose from "mongoose";
import userRouter from './routes/userRouts'
import missileRouter from './routes/missileRouter'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', userRouter);
app.use('/api/missiles', missileRouter);


const connectDB = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB()
});

