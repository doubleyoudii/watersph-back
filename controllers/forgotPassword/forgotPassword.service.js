"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mayajs/core");
const register_service_1 = require("../register/register.service");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
let ForgotPasswordServices = class ForgotPasswordServices {
    constructor(register) {
        this.register = register;
    }
    findUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = _.pick(body, ["memberId"]);
            try {
                let currentId = Number(id.memberId);
                let convertedId;
                if (Number.isNaN(currentId)) {
                    convertedId = id.memberId;
                }
                else {
                    convertedId = currentId;
                }
                let testData = yield this.register.registrationMember(convertedId);
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
                    mesage: "Confirmation is sent to your email, Please check your email to proceed",
                    data: { testData, payload, token },
                    meta: {}
                };
            }
            catch (error) {
                return {
                    status: 400,
                    message: error.errmsg ? error.errmsg : error.toString(),
                    data: [],
                    meta: {}
                };
            }
        });
    }
    getCredentials(params) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            catch (error) {
                return {
                    status: 400,
                    message: error.errmsg ? error.errmsg : error.toString(),
                    data: [],
                    meta: {}
                };
            }
        });
    }
    changePassword(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = _.pick(body, ["memberId", "password"]);
            try {
                const member = yield this.register.findRegMemberAndChangepassword(form);
                if (!member) {
                    return {
                        status: 400,
                        message: "Somethings went wrong changing Password. Go to your email again.",
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
            }
            catch (error) {
                return {
                    status: 400,
                    message: error.errmsg ? error.errmsg : error.toString(),
                    data: [],
                    meta: {}
                };
            }
        });
    }
};
ForgotPasswordServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [register_service_1.RegisterServices])
], ForgotPasswordServices);
exports.ForgotPasswordServices = ForgotPasswordServices;
