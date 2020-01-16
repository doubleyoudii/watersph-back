import { MongoSchema, MongoModel } from "@mayajs/mongo";

const schema = MongoSchema({
  /* ProductCode: {
    type: String
  },
  PAYMENTTYPE: {
    type: String
  },
  TransactionNo: {
    type: String
  },
  SalesPoints: {
    type: String
  },
  Quantity: {
    type: String
  },
  TRANSACTIONDATE: {
    type: String
  },
  PRODUCT: {
    type: String
  },
  POSLOCATION: {
    type: String
  }, */
  MemberID: {
    type: String
  }
  /* ,
  Customer: {
    type: String
  },
  acivationdate: {
    type: String
  },
  transno: {
    type: String
  },
  Yearprocessed: {
    type: String
  },
  Periodno: {
    type: String
  },
  DDname: {
    type: String
  },
  WeekRegistered: {
    type: String
  },
  EntryDate: {
    type: String
  },
  MemberName: {
    type: String
  },
  LevelPosition: {
    type: String
  },
  GroupPersonal: {
    type: String
  },
  weekno: {
    type: String
  },
  DistributorPro_: {
    type: String
  },
  status: {
    type: String
  },
  DLentrydate: {
    type: String
  },
  SponsorName: {
    type: String
  },
  Rank: {
    type: String
  } */
});

export default MongoModel("PersonalSales", schema);
