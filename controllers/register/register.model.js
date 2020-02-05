"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("@mayajs/mongo");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const schema = mongo_1.MongoSchema({
    fullName: {
        //this should be Full Name
        required: [true, "Full name is Required"],
        type: String
    },
    password: {
        required: [true, "Password is Required"],
        type: String
    },
    contactNo: {
        type: Number
    },
    userName: {
        type: String
    },
    memberId: {},
    email: {
        required: [true, "email is Required"],
        type: String
        //try to add unique property here
    },
    dateRegistered: {
        type: Date,
        default: new Date().getTime()
    }
});
schema.pre("save", function (next) {
    let dealer = this;
    if (!dealer.isModified("password"))
        return next();
    //generate a salt
    bcryptjs_1.default.genSalt(10, function (err, salt) {
        if (err)
            return next(err);
        //Hash password using salt
        bcryptjs_1.default.hash(dealer.password, salt, function (err, hash) {
            if (err)
                return next(err);
            dealer.password = hash;
            next();
        });
    });
});
exports.default = mongo_1.MongoModel("Register", schema);
