import { MongoSchema, MongoModel } from "@mayajs/mongo";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const schema = MongoSchema({
  fullName: {
    //this should be Full Name
    required: [true, "Full name is Required"],
    type: String
  },
  password: {
    required: [true, "Password is Required"],
    type: String
  },
  contactNo: {
    type: Number
  },
  userName: {
    type: String
  },
  memberId: {},
  email: {
    required: [true, "email is Required"],
    type: String
    //try to add unique property here
  },
  dateRegistered: {
    type: Date,
    default: new Date().getTime()
  }
});

schema.pre("save", function(next) {
  let dealer: any = this;

  if (!dealer.isModified("password")) return next();
  //generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    //Hash password using salt
    bcrypt.hash(dealer.password, salt, function(err, hash) {
      if (err) return next(err);

      dealer.password = hash;
      next();
    });
  });
});

export default MongoModel("Register", schema);
