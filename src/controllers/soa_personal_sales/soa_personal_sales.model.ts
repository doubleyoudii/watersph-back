import { MongoSchema, MongoModel } from "@mayajs/mongo";

const schema = MongoSchema({
  name: {
    required: [true, "Name is required."],
    type: String,
    unique: true,
  },
});

export default MongoModel("Soa_personal_sales", schema);