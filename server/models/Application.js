import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, required: true },
  firstName: { type: String, required: true },
  position: { type: String, required: true },
  style: { type: String, required: true },
  experience: { type: String },
  age: { type: Number, required: true },

  resume: { type: String }
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;
