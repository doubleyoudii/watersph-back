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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mayajs/core");
let Soa_personal_salesController = class Soa_personal_salesController {
    constructor() { }
};
Soa_personal_salesController = __decorate([
    core_1.Controller({
        model: "./soa_personal_sales.model",
        route: "/soa_personal_sales",
    }),
    __metadata("design:paramtypes", [])
], Soa_personal_salesController);
exports.Soa_personal_salesController = Soa_personal_salesController;
