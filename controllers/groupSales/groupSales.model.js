"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("@mayajs/mongo");
const schema = mongo_1.MongoSchema({
    MemberID: {}
});
exports.default = mongo_1.MongoModel("GroupSales", schema);
