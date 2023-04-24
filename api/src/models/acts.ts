import mongoose, { Schema, Document } from "mongoose";

// Define interface that extends the Mongoose Document interface,
// and specifies the shape of an "Act" document
export interface IAct extends Document {
  name: string;
  stage: string;
  date: Date;
  start: number;
  end: number;
  user_id: string;
}

// Define a new Mongoose schema for the "Act" data object
const ActSchema: Schema = new Schema({
  name: { type: String, required: true },
  stage: { type: String, required: true },
  date: { type: Date, required: true },
  start: { type: Number, required: true },
  end: { type: Number, required: true },
  user_id: { type: String, required: true },
});

// Create a Mongoose model for the "Act" data object using the defined schema
const Act = mongoose.model<IAct>("Act", ActSchema);

export default Act;
