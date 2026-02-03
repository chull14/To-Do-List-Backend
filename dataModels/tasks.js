import mongoose from "mongoose";
import { Schema } from "mongoose";

const taskSchema = new Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  taskTitle: { type: String },
  description: { type: String },
  status: { type: Boolean }
}, { timestamps: true });

const Task = mongoose.model('task', taskSchema);

export default Task;