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
const mongo_1 = require("@mayajs/mongo");
const register_service_1 = require("../register/register.service");
const _ = require("lodash");
let AdminServices = class AdminServices {
    constructor(register) {
        this.register = register;
    }
    createAdmin(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = _.pick(body, ["userName", "password"]);
            try {
                const admin = yield this.model.create(data);
                const adminfin = yield admin.save();
                return {
                    status: 200,
                    message: "Register Successfully!",
                    data: adminfin,
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
    loginAdmin(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = _.pick(body, ["userName", "password"]);
            try {
                const admin = yield this.model.findOne({ userName: data.userName });
                if (!admin) {
                    return {
                        status: 404,
                        message: "Admin Account does not exist",
                        data: [],
                        meta: {}
                    };
                }
                const payload = {
                    _id: admin._id,
                    userName: admin.userName
                };
                if (admin.password === data.password) {
                    return {
                        status: 200,
                        message: "Login Success",
                        data: payload,
                        meta: {}
                    };
                }
                else {
                    return {
                        status: 404,
                        message: "Incorrect Password. Please try again",
                        data: [],
                        meta: {}
                    };
                }
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
    getList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.register.getRegistered();
                return {
                    status: 200,
                    message: "Get Registered List success",
                    data: result,
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
    getListById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.register.getRegisteredById(id);
                if (!result) {
                    return {
                        status: 200,
                        message: "Member does not exist",
                        data: [],
                        meta: {}
                    };
                }
                return {
                    status: 200,
                    message: "Get Registered by Id",
                    data: result,
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
__decorate([
    mongo_1.Models("admin"),
    __metadata("design:type", Object)
], AdminServices.prototype, "model", void 0);
AdminServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [register_service_1.RegisterServices])
], AdminServices);
exports.AdminServices = AdminServices;
