import { MongoSchema, MongoModel } from "@mayajs/mongo";

const schema = MongoSchema({
  userName: {
    required: [true, "Name is required."],
    type: String
  },
  password: {
    required: [true, "password is required"],
    type: String
  }
});

export default MongoModel("Admin", schema);
