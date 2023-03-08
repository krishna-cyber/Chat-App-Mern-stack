const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// Define collection and schema for User
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  const saltRounds = Number(process.env.SALT);

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(saltRounds, function (saltError, saltRounds) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, saltRounds, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }
          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});
// Export the model
const User = mongoose.model("User", userSchema);

module.exports = User;
