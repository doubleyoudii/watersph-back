import { MongoSchema, MongoModel } from "@mayajs/mongo";

const schema = MongoSchema({
  MemberID: {
    type: String
  }
  // ,
  // MemberName: {
  //   type: String
  // },
  // LevelPosition: {
  //   type: String
  // },
  // DownlineID: {
  //   type: String
  // },
  // FullName: {
  //   type: String
  // },
  // EntryDate: {
  //   type: String
  // },
  // DownlineSponsor_: {
  //   type: String
  // },
  // DateProcessed: {
  //   type: String
  // },
  // Status: {
  //   type: String
  // },
  // Rank: {
  //   type: String
  // },
  // MEMBERRANK: {
  //   type: String
  // },
  // DOWNLINERANK: {
  //   type: String
  // },
  // YEARPROCESSED: {
  //   type: String
  // },
  // PERIODNO: {
  //   type: String
  // }
});

export default MongoModel("Genealogy", schema);
