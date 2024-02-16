const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Transaction = require("./Transaction");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username at least 3 character"],
      maxlength: [20, "Username not more than 20 character"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name at least 3 character"],
      maxlength: [30, "Name not more than 30 character"],
    },
    email: {
      type: String,
      required: [true, `Email is required`],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email is wrong",
      ],
      unique: [true, "Email must ba a unique"],
    },
    contactNumber: { type: String },
    password: { type: String },
    role: {
      type: String,
      enum: ['user', 'admin']
    }
  },
  {
    timestamps: true,
  },
);

// encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


// delete the transactions associated with a user  
userSchema.pre("findOneAndDelete", async function (next) {
  const userId = this.getFilter()._id;

  try {
    await Transaction.deleteMany({ user: userId });
    next();
  } catch (error) {
    next(error);
  }
})

module.exports = mongoose.model("User", userSchema);
