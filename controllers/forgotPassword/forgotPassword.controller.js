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
const common_1 = require("@mayajs/common");
const core_1 = require("@mayajs/core");
const forgotPassword_service_1 = require("./forgotPassword.service");
const nodemailer = require("nodemailer");
let ForgotPasswordController = class ForgotPasswordController {
  constructor(services) {
    this.services = services;
  }
  get(req, res, next) {
    res.json({ message: "Welcome to Forgot password page" });
  }
  post(req, res, next) {
    return __awaiter(this, void 0, void 0, function*() {
      const result = yield this.services.findUser(req.body);
      res.status(result.status).send(result);
      if (result.status === 200) {
        const mailContent = `
      <h4>This is the Confirmation link for Forgot Password!</h4>
      <p>Note: This is only a one time confirmation link. If there's a problem occur during the proccess, please send another Link. This Link will expire after 1hr, Thank you</p>
      <div>
        
        <p><a href="${process.env.DEVELOPMENT}/change-password/${result.data.payload.memberId}/${result.data.token}">**Proceed to Changing of Password**</p>
      </div>`;
        function main() {
          return __awaiter(this, void 0, void 0, function*() {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              host: "smtp.mail.yahoo.com",
              port: 465,
              secure: true,
              auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS // generated ethereal password
              },
              tls: {
                rejectUnauthorized: false
              }
            });
            // send mail with defined transport object
            let info = yield transporter.sendMail({
              from: `"Waters Philippines Distributor's Portal " <${process.env.USER_EMAIL}>`,
              to: `${result.data.payload.email}`,
              subject: "Forgot Password Verification",
              text: "Read Me!",
              html: mailContent // html body
            });
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          });
        }
        main().catch(console.error);
      }
    });
  }
  getCredentials(req, res, next) {
    return __awaiter(this, void 0, void 0, function*() {
      // Use a function on SampleService
      const result = yield this.services.getCredentials(req.params);
      // Do some GET stuff here
      res.status(result.status).json(result);
    });
  }
  postChange(req, res, next) {
    return __awaiter(this, void 0, void 0, function*() {
      const result = yield this.services.changePassword(req.body);
      res.status(result.status).send(result);
    });
  }
};
__decorate(
  [
    common_1.Get({
      path: "/",
      middlewares: []
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Object)
  ],
  ForgotPasswordController.prototype,
  "get",
  null
);
__decorate(
  [
    common_1.Post({ path: "/", middlewares: [] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
  ],
  ForgotPasswordController.prototype,
  "post",
  null
);
__decorate(
  [
    common_1.Get({ path: "/validate/:memberId/:token", middlewares: [] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
  ],
  ForgotPasswordController.prototype,
  "getCredentials",
  null
);
__decorate(
  [
    common_1.Post({ path: "/changePassword", middlewares: [] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
  ],
  ForgotPasswordController.prototype,
  "postChange",
  null
);
ForgotPasswordController = __decorate(
  [
    core_1.Controller({
      model: "./forgotPassword.model",
      route: "/forgotPassword"
    }),
    __metadata("design:paramtypes", [
      forgotPassword_service_1.ForgotPasswordServices
    ])
  ],
  ForgotPasswordController
);
exports.ForgotPasswordController = ForgotPasswordController;
