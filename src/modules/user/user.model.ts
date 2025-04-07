import { Model, model, Models, Schema } from "mongoose";
import { IUser } from "./user.interfaces";
import { hashPassword } from "../../utils/password.utils";
import mongoose from "mongoose";

const UserSchema = new Schema<IUser>({
  avatar: { type: String, default: null },
  email: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  name: { type: String, required: true },
  phone: { type: String },
  password: { type: String, minlength: 8, required: true },
  role: { type: String },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    unique: true,
    default: null,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    try {
      user.password = (await hashPassword(user.password)) as string;
      next();
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
});

const User: Model<IUser> = model<IUser>("User", UserSchema);

export default User;
