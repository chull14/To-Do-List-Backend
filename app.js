import express from 'express';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

const app = express();
const router = express.Router();

configDotenv('./.env');
const PORT = process.env.PORT;
const db = process.env.MONGO_URI;

router.get('/', (req, res, next) => {
  console.log("Router is working");
  res.send("Hello");
  res.end();
});

app.use(router);

async function startServer() {
  try {
    await mongoose.connect(db);
    console.log("Connected to MongoDB Database");

    app.listen(PORT, (err) => {
      if (err) return console.log("Server Error Occurred");
      console.log(`Express Server Listening on port ${PORT}`);
    });
  } catch (error) {
    return console.log("Failed to Connect to Database");
  }
};

startServer();