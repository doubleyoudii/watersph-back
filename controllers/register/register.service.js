"use strict";
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mayajs/core");
const mongo_1 = require("@mayajs/mongo");
const profile_service_1 = require("../profile/profile.service");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let RegisterServices = class RegisterServices {
  constructor(profiles) {
    this.profiles = profiles;
  }
  verifyMemberId(body) {
    return __awaiter(this, void 0, void 0, function*() {
      let data = _.pick(body, ["email", "memberId"]);
      try {
        let currentId = Number(data.memberId);
        let convertedId;
        if (Number.isNaN(currentId)) {
          convertedId = data.memberId;
        } else {
          convertedId = currentId;
        }
        //find member id is MemberIDcollection
        //if true, return data. else return error
        const member = yield this.profiles.findMember(convertedId);
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
    });
  }
  getCredentials(body) {
    return __awaiter(this, void 0, void 0, function*() {
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
    });
  }
  postForm(body) {
    return __awaiter(this, void 0, void 0, function*() {
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
        const checkIfexist = yield this.model.findOne({
          memberId: convertedId
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
        const result = yield this.model.create(data);
        const finalReg = yield result.save();
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
    });
  }
  postLogin(body) {
    return __awaiter(this, void 0, void 0, function*() {
      const data = _.pick(body, ["memberId", "password"]);
      try {
        let currentId = Number(data.memberId);
        let convertedId;
        if (Number.isNaN(currentId)) {
          convertedId = data.memberId;
        } else {
          convertedId = currentId;
        }
        const result = yield this.model.findOne({ memberId: convertedId });
        if (!result) {
          return {
            status: 404,
            message: "Cannot Find MemberID",
            data: [],
            meta: {}
          };
        }
        return bcrypt.compare(data.password, result.password).then(isMatch => {
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
    });
  }
  getMe(id) {
    return __awaiter(this, void 0, void 0, function*() {
      try {
        const me = yield this.model.findOne({ memberId: id });
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
    });
  }
  postEditReg(id, body) {
    return __awaiter(this, void 0, void 0, function*() {
      try {
        const newBody = _.pick(body, [
          "fullName",
          "email",
          "contactNo",
          "userName"
        ]);
        const dealer = yield this.model.findOneAndUpdate(
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
    });
  }
  //funtion Needed in forgot password
  registrationMember(body) {
    return __awaiter(this, void 0, void 0, function*() {
      let user = yield this.model.findOne({ memberId: body });
      return user;
    });
  }
  findRegMemberAndChangepassword(body) {
    return __awaiter(this, void 0, void 0, function*() {
      let currentId = Number(body.memberId);
      let convertedId;
      if (Number.isNaN(currentId)) {
        convertedId = body.memberId;
      } else {
        convertedId = currentId;
      }
      let user = yield this.model.findOne({ memberId: convertedId });
      if (!user) {
        return null;
      }

      user.memberId = convertedId;
      user.password = body.password;
      yield user.save();
      return user;
    });
  }
  //Admin Service need````````````````````````````````````````
  getRegistered() {
    return __awaiter(this, void 0, void 0, function*() {
      const list = yield this.model.find();
      return list;
    });
  }
  getRegisteredById(id) {
    return __awaiter(this, void 0, void 0, function*() {
      const member = yield this.model.findOne({ _id: id });
      return member;
    });
  }
};
__decorate(
  [mongo_1.Models("register"), __metadata("design:type", Object)],
  RegisterServices.prototype,
  "model",
  void 0
);
RegisterServices = __decorate(
  [
    core_1.Injectable(),
    __metadata("design:paramtypes", [profile_service_1.ProfileServices])
  ],
  RegisterServices
);
exports.RegisterServices = RegisterServices;
