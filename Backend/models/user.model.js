import mongoose from "mongoose";

const { Schema } = mongoose;

export const UserSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    name: {
        type: String,
        required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    password: {
      type: String,
      required: true,
      minlength: 60, 
      select: false, 
    
    },

    role: {
      type: String,
      required: true,
      enum: ["TEACHER", "STUDENT", "PARENT"],
    },

    birthDay: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export const UserModel = mongoose.model("User", UserSchema)