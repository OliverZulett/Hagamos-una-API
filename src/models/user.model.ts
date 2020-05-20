import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  role: string;
  email: string;
  password: string;
  nick: string;
  image: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      default: "USER_ROLE",
      enum: {
        values: ["ADMIN_ROLE", "USER_ROLE"],
        message: "{VALUE} no es un rol permitido",
      },
    },
    email: {
      unique: true,
      type: String,
      trim: true,
      require: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    nick: {
      type: String,
      lowercase: true,
      trim: true,
      require: true,
    },
    image: {
      type: String,
      default: "user-default.png",
      required: true,
    },
  },
  {
    collection: "users",
  }
);

// cifrado
userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);
