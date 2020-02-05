"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("@mayajs/mongo");
const schema = mongo_1.MongoSchema({
    name: {
        required: [true, "Name is required."],
        type: String,
        unique: true,
    },
});
exports.default = mongo_1.MongoModel("Soa_summary_income", schema);
