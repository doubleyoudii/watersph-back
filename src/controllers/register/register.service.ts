import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";
var _ = require("lodash");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

@Injectable()
export class RegisterServices {
  // @Models("register") model: any;
  @Models("register") model: any;
  // constructor() {}
  async verifyMemberId(body: any) {
    let data = _.pick(body, ["email", "memberId"]);

    try {
      //This space is reserve incase the members.csv will be use.
      //find member id is MemberIDcollection
      //if true, return data. else return error

      const payload = {
        memberId: data.memberId,
        email: data.email
      };

      const salt = `${data.memberId}`;
      const token = jwt.sign(payload, salt, { expiresIn: "1h" });

      return {
        status: 200,
        message:
          "Activation on process, Please check your email for virification",
        data: token,
        meta: {}
      };
    } catch (error) {
      return {
        status: 400,
        message: error.errmsg ? error.errmsg : error.toString(),
        data: [],
        meta: {}
      };
    }
  }
}
