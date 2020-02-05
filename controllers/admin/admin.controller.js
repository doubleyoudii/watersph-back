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
const admin_service_1 = require("./admin.service");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../../middleware/index");
let AdminController = class AdminController {
    constructor(services) {
        this.services = services;
    }
    get(req, res, next) {
        res.json({ message: "Welcome to Admin page" });
    }
    postCreate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.services.createAdmin(req.body);
            res.status(result.status).send(result);
        });
    }
    postLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.services.loginAdmin(req.body);
            const salt = process.env.JWT_SALT_ADMIN;
            if (result.status !== 200) {
                res.status(result.status).send(result);
                return;
            }
            yield jwt.sign(result.data, salt, { expiresIn: "1h" }, (e, token) => {
                res
                    .status(result.status)
                    .header("authorization", token)
                    .json({
                    success: true,
                    token: "Bearer " + token
                });
            });
        });
    }
    getList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.services.getList();
            res.status(result.status).send(result);
        });
    }
    getListById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.services.getListById(req.params.id);
            res.status(result.status).send(result);
        });
    }
};
__decorate([
    common_1.Get({
        path: "/",
        middlewares: []
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "get", null);
__decorate([
    common_1.Post({ path: "/createAdmin", middlewares: [] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "postCreate", null);
__decorate([
    common_1.Post({ path: "/login", middlewares: [] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "postLogin", null);
__decorate([
    common_1.Get({
        path: "/registrationList",
        middlewares: [verifyToken]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getList", null);
__decorate([
    common_1.Get({ path: "/registrationList/:id", middlewares: [verifyToken] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getListById", null);
AdminController = __decorate([
    core_1.Controller({
        model: "./admin.model",
        route: "/admin"
    }),
    __metadata("design:paramtypes", [admin_service_1.AdminServices])
], AdminController);
exports.AdminController = AdminController;
