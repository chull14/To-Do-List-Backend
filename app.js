import express from 'express';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import taskRoute from './routes/taskRoutes.js';
import userRoute from './routes/userRoutes.js';

const app = express();
const router = express.Router();

configDotenv('./.env');
const PORT = process.env.PORT;
const db = process.env.MONGO_URI;

app.use(express.json());

// home page
router.get('/', (req, res, next) => {
  console.log("Router is working");
  res.send("Hello");
  res.end();
});

// users endpoint
router.route('/users')
  .post(userRoute.createUser)
  .get(userRoute.getAllUsers);

// users ID endpoint
router.route('/users/:id')
  .get(userRoute.getUser)
  .delete(userRoute.deleteUser);

// tasks endpoint
router.route('/tasks')
  .get(taskRoute.getAllTasks)
  .post(taskRoute.createTask);

// tasks ID endpoint
router.route('/tasks/:id')
  .delete(taskRoute.deleteTask)
  .put(taskRoute.updateTask);

app.use(router);

// start server only when we connect to DB
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