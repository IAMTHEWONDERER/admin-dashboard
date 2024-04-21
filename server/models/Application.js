import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  status: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  experience: { type: String },
  resume: { type: String }
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;
