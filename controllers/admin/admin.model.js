"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("@mayajs/mongo");
const schema = mongo_1.MongoSchema({
    userName: {
        required: [true, "Name is required."],
        type: String
    },
    password: {
        required: [true, "password is required"],
        type: String
    }
});
exports.default = mongo_1.MongoModel("Admin", schema);