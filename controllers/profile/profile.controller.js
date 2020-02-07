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
const common_1 = require("@mayajs/common");
const core_1 = require("@mayajs/core");
const profile_service_1 = require("./profile.service");
const { verifyTokenMember } = require("../../middleware/index");
let ProfileController = class ProfileController {
    constructor(services) {
        this.services = services;
    }
    getMe(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.body.user.memberId;
            const result = yield this.services.findMember(userId);
            res.status(result.status).send(result);
        });
    }
};
__decorate([
    common_1.Get({ path: "/me", middlewares: [verifyTokenMember] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getMe", null);
ProfileController = __decorate([
    core_1.Controller({
        model: "./profile.model",
        route: "/profile"
    }),
    __metadata("design:paramtypes", [profile_service_1.ProfileServices])
], ProfileController);
exports.ProfileController = ProfileController;
