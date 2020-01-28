import { MongoSchema, MongoModel } from "@mayajs/mongo";

const schema = MongoSchema({
  MemberId: {
    type: String
  }
});

export default MongoModel("CutoffDates", schema);
