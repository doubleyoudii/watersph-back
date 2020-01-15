import { MongoSchema, MongoModel } from "@mayajs/mongo";

const schema = MongoSchema({
  userName: {
    //this should be Full Name
    required: [true, "Name is required."],
    type: String
  },
  password: {
    required: [true, "Password is Required"],
    type: String
  },
  memberId: {
    required: [true, "Member ID is required"],
    type: String,
    unique: true
  },
  dateRegistered: {
    type: Date,
    default: new Date().getTime()
  }
});

export default MongoModel("Register", schema);
