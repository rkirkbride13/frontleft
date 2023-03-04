import mongoose, { Schema, Document } from 'mongoose';

export interface IAct extends Document {
  name: string;
  stage: string;
  date: Date;
  start: number;
  end: number;
  user_id: string;
}

const ActSchema: Schema = new Schema({
  name: { type: String, required: true },
  stage: { type: String, required: true },
  date: { type: Date, required: true },
  start: { type: Number, required: true },
  end: { type: Number, required: true },
  user_id: { type: String, required: true}
});

const Act = mongoose.model<IAct>('Act', ActSchema);

export default Act;
