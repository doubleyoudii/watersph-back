import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";
import { ProfileServices } from "../profile/profile.service";
var _ = require("lodash");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

@Injectable()
export class RegisterServices {
  @Models("register") model: any;
  constructor(private profiles: ProfileServices) {}
  async verifyMemberId(body: any) {
    let data = _.pick(body, ["email", "memberId"]);

    try {
      //This space is reserve incase the members.csv will be use.
      //find member id is MemberIDcollection
      //if true, return data. else return error
      const member = await this.profiles.findMember(data.memberId);
      console.log(member);
      if (member.status !== 200) {
        //Checks if memberId is Valid or not
        return {
          status: 400,
          message: member.message,
          data: [],
          meta: {}
        };
      }

      //Member ID is Valid
      const payload = {
        memberId: member.data,
        email: data.email
      };

      const salt = `${data.memberId}`;
      const token = jwt.sign(payload, salt, { expiresIn: "2h" });
      console.log(token);

      return {
        status: 200,
        message:
          "Activation on process, Please check your email for verification",
        data: { payload, token },
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

  async getCredentials(body: any) {
    const parameter = _.pick(body, ["memberId", "token"]);
    try {
      const payload = jwt.verify(parameter.token, parameter.memberId);
      console.log(payload);
      if (
        !payload
        /* payload === undefined ||
        payload.id === undefined ||
        payload.email === undefined */
      ) {
        return {
          status: 400,
          message: "Invalid Credentials! Try Again.",
          data: [],
          meta: {}
        };
      }

      return {
        status: 200,
        message: "Valid Credentials!",
        data: payload,
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

  async postForm(body: any) {
    const data = _.pick(body, ["fullName", "password", "email", "memberId"]);
    try {
      const checkIfexist = await this.model.findOne({
        memberId: data.memberId
      });
      if (checkIfexist !== null) {
        return {
          status: 400,
          message: "Member Already Exist, Please try again.",
          data: [],
          meta: {}
        };
      }

      const result = await this.model.create(data);
      const finalReg = await result.save();
      return {
        status: 200,
        message: "REgister Successfully!",
        data: finalReg,
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
