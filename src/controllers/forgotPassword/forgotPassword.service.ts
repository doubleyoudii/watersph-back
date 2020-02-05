import { Injectable } from "@mayajs/core";
import { RegisterServices } from "../register/register.service";
const _ = require("lodash");
const jwt = require("jsonwebtoken");

@Injectable()
export class ForgotPasswordServices {
  constructor(private register: RegisterServices) {}

  async findUser(body: any) {
    const id = _.pick(body, ["memberId"]);

    try {
      let currentId = Number(id.memberId);
      let convertedId: any;
      console.log(currentId);
      if (Number.isNaN(currentId)) {
        convertedId = id.memberId;
      } else {
        convertedId = currentId;
      }
      // console.log(typeof convertedId);
      console.log(convertedId);

      let testData = await this.register.registrationMember(convertedId);

      if (!testData) {
        return {
          status: 400,
          message: "Cannot find Member ID",
          data: [],
          meta: {}
        };
      }

      //Member Exist
      const payload = {
        email: testData.email,
        memberId: testData.memberId
      };
      const salt = `${testData.memberId}`;
      const token = jwt.sign(payload, salt, { expiresIn: "2h" });

      return {
        status: 200,
        mesage:
          "Confirmation is sent to your email, Please check your email to proceed",
        data: { testData, payload, token },
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

  async getCredentials(params: any) {
    const parameter = _.pick(params, ["memberId", "token"]);

    try {
      const payload = jwt.verify(parameter.token, parameter.memberId);

      if (!payload) {
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

  async changePassword(body: any) {
    const form = _.pick(body, ["memberId", "password"]);
    try {
      const member = await this.register.findRegMemberAndChangepassword(form);

      if (!member) {
        return {
          status: 400,
          message:
            "Somethings went wrong changing Password. Go to your email again.",
          data: [],
          meta: {}
        };
      }

      return {
        status: 200,
        message: "Password chage succesfully",
        data: member,
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
