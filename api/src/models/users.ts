import mongoose, { Schema, Document } from "mongoose";

// Define an interface that extends the Mongoose Document interface,
// and specifies the shape of an "User" document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  picture: Buffer;
}
// Define a new Mongoose schema for the "User" data object
const UserSchema: Schema = new Schema({
  name: { type: String, required: true } as any,
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    // A regular expression for validating the format of the email address
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  } as any,
  password: { type: String, required: true } as any,
  // A buffer field for storing the user's profile picture
  picture: {
    type: Buffer,
  },
});
// Create a Mongoose model for the "User" data object using the defined schema
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
