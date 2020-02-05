import { MongoSchema, MongoModel } from "@mayajs/mongo";

const schema = MongoSchema({
  MemberID: {}
});

export default MongoModel("GroupSales", schema);
