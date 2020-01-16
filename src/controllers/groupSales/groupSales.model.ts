import { MongoSchema, MongoModel } from "@mayajs/mongo";

const schema = MongoSchema({
  MemberID: {
    type: String
  }
});

export default MongoModel("GroupSales", schema);
