import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";
import { ProfileServices } from "../profile/profile.service";

const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

@Injectable()
export class RegisterServices {
  @Models("register") model: any;
  constructor(private profiles: ProfileServices) {}
  async verifyMemberId(body: any) {
    let data = _.pick(body, ["email", "memberId"]);

    try {
      let currentId = Number(data.memberId);
      let convertedId: any;

      if (Number.isNaN(currentId)) {
        convertedId = data.memberId;
      } else {
        convertedId = currentId;
      }

      //find member id is MemberIDcollection
      //if true, return data. else return error
      const member = await this.profiles.findMember(convertedId);

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
        memberId: member.data.MemberID,
        email: data.email
      };

      const salt = `${data.memberId}`;
      const token = jwt.sign(payload, salt, { expiresIn: "7h" });

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

  async postForm(body: any) {
    const data = _.pick(body, [
      "fullName",
      "password",
      "email",
      "memberId",
      "contactNo",
      "userName"
    ]);
    try {
      let currentId = Number(data.memberId);
      let convertedId;
      if (Number.isNaN(currentId)) {
        convertedId = data.memberId;
      } else {
        convertedId = currentId;
      }

      const checkIfexist = await this.model.findOne({
        memberId: currentId
      });
      if (checkIfexist !== null) {
        return {
          status: 400,
          message: "Member Already Exist, Please try again.",
          data: [],
          meta: {}
        };
      }

      data.memberId = convertedId;
      const result = await this.model.create(data);
      const finalReg = await result.save();
      return {
        status: 200,
        message: "Register Successfully!",
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

  async postLogin(body: any) {
    const data = _.pick(body, ["memberId", "password"]);
    try {
      let currentId = Number(data.memberId);
      let convertedId: any;

      if (Number.isNaN(currentId)) {
        convertedId = data.memberId;
      } else {
        convertedId = currentId;
      }

      const result = await this.model.findOne({ memberId: convertedId });

      if (!result) {
        return {
          status: 404,
          message: "Cannot Find MemberID",
          data: [],
          meta: {}
        };
      }

      return bcrypt
        .compare(data.password, result.password)
        .then((isMatch: any) => {
          if (isMatch) {
            //User match

            const payload = {
              _id: result._id,
              memberId: result.memberId
            };
            //Create JWT Payload
            return {
              status: 200,
              message: "Password Match",
              data: payload,
              meta: {}
            };
          } else {
            return {
              status: 400,
              message: "Incorrect Password. Try Again!",
              data: [],
              meta: {}
            };
          }
        });
    } catch (error) {
      return {
        status: 400,
        message: error.errmsg ? error.errmsg : error.toString(),
        data: [],
        meta: {}
      };
    }
  }

  async getMe(id: any) {
    try {
      const me = await this.model.findOne({ memberId: id });
      return {
        status: 200,
        message: "Fetch Registered Information",
        data: me,
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

  async postEditReg(id: any, body: any) {
    try {
      const newBody = _.pick(body, [
        "fullName",
        "email",
        "contactNo",
        "userName"
      ]);

      const dealer = await this.model.findOneAndUpdate(
        { memberId: id },
        { $set: newBody },
        {
          new: true
        }
      );

      return {
        status: 200,
        message: "Update Register Information",
        data: dealer,
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

  //funtion Needed in forgot password
  async registrationMember(body: any) {
    let user = await this.model.findOne({ memberId: body });
    return user;
  }

  async findRegMemberAndChangepassword(body: any) {
    let currentId = Number(body.memberId);
    let convertedId;
    if (Number.isNaN(currentId)) {
      convertedId = body.memberId;
    } else {
      convertedId = currentId;
    }
    let user = await this.model.findOne({ memberId: convertedId });
    if (!user) {
      return null;
    }
    user.memberId = convertedId;
    user.password = body.password;
    await user.save();
    return user;
  }

  //Admin Service need````````````````````````````````````````
  async getRegistered() {
    const list = await this.model.find();
    return list;
  }

  async getRegisteredById(id: any) {
    const member = await this.model.findOne({ _id: id });
    return member;
  }
}
