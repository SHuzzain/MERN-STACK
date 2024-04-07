import mongoose, { Model, Schema, model } from "mongoose";
import mangoose from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const User = model("User", userSchema);

type UserType = typeof User extends Model<infer U> ? U : never;

export { User, UserType };
