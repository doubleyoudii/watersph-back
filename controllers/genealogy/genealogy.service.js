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
const _ = require("lodash");
let GenealogyServices = class GenealogyServices {
    constructor() { }
    getFilter(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = userId;
            try {
                const partialFilter = yield this.model.find({ MemberID: id });
                return {
                    status: 200,
                    message: "Genealogy Fetch by id",
                    data: partialFilter,
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
    getData(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const parameter = params;
            const rawDate = parameter.date;
            const convertDate = rawDate;
            try {
                const geneData = yield this.model
                    .find({
                    MemberID: parameter.id,
                    YEARPROCESSED: Number(convertDate),
                    PERIODNO: Number(parameter.period),
                    Status: "ACTIVE"
                })
                    .sort({ LevelPosition: 1 });
                return {
                    status: 200,
                    mesage: "Fetch genealogy using filters successful",
                    data: geneData,
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
    mongo_1.Models("genealogy"),
    __metadata("design:type", Object)
], GenealogyServices.prototype, "model", void 0);
GenealogyServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], GenealogyServices);
exports.GenealogyServices = GenealogyServices;
