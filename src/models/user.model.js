import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import environments from "../../config/environments.js";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      uppercase: true,
      trim: true,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      loadClass: true,
      trim: true,
      required: [[true, "Email is required"]],
      unique: [true, "This email already taken"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is invalid");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id }, environments.TOKEN_CODE);
  user.tokens.push({ token: token });

  await user.save();

  return token;
};

userSchema.statics.findUserByEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("Login faild");
  }
  const compareUserPassword = await bcrypt.compare(password, user.password);

  if (!compareUserPassword) {
    throw new Error("Password incorrect");
  }

  return user;
};

userSchema.methods.toJSON = function () {
  const user = this;

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  delete userObj.__v;

  return userObj;
};

userSchema.virtual("cart", {
  ref: "Cart",
  localField: "_id",
  foreignField: "ownerID",
});

const User = mongoose.model("User", userSchema);

export default User;
