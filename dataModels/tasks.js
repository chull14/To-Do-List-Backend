import mongoose from "mongoose";
import { Schema } from "mongoose";

const taskSchema = new Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId
  },
  taskTitle: { type: String },
  description: { type: String },
  status: { type: Boolean, default: false }
}, { timestamps: true });

const Task = mongoose.model('task', taskSchema);

export default Task;