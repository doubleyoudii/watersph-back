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
const genealogy_service_1 = require("./genealogy.service");
const { verifyTokenMember } = require("../../middleware/index");
const _ = require("lodash");
let GenealogyController = class GenealogyController {
    constructor(services) {
        this.services = services;
    }
    getFilter(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            function removeDuplicates(array) {
                let x = {};
                array.forEach(function (i) {
                    if (!x[i]) {
                        x[i] = true;
                    }
                });
                return Object.keys(x);
            }
            //To Be Change
            const userId = req.body.user.memberId;
            const result = yield this.services.getFilter(userId);
            let dates = [];
            let period = [];
            let partialFilter = JSON.stringify(result.data);
            let b2bfilter = JSON.parse(partialFilter);
            //PickedFilter is rawfile picked
            const pickedFilter = b2bfilter.map((el) => {
                const picked = _.pick(el, ["YEARPROCESSED", "PERIODNO"]);
                return picked;
            });
            pickedFilter.forEach((el) => {
                dates.push(el.YEARPROCESSED);
                period.push(el.PERIODNO);
            });
            const filteredDate = removeDuplicates(dates);
            const filteredPeriod = removeDuplicates(period);
            var sortedStrings = filteredDate.sort(function (a, b) {
                return a - b;
            });
            res.status(result.status).json({
                message: result.message,
                filter: {
                    dateInterval: sortedStrings,
                    periodInterval: filteredPeriod
                }
            });
        });
    }
    getData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //To be Change
            const userId = req.body.user.memberId;
            const params = {
                id: userId,
                date: req.params.date,
                period: req.params.period
            };
            const result = yield this.services.getData(params);
            res.status(result.status).send(result);
        });
    }
};
__decorate([
    common_1.Get({ path: "/", middlewares: [verifyTokenMember] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], GenealogyController.prototype, "getFilter", null);
__decorate([
    common_1.Get({ path: "/specific/:date/:period", middlewares: [verifyTokenMember] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], GenealogyController.prototype, "getData", null);
GenealogyController = __decorate([
    core_1.Controller({
        model: "./genealogy.model",
        route: "/genealogy"
    }),
    __metadata("design:paramtypes", [genealogy_service_1.GenealogyServices])
], GenealogyController);
exports.GenealogyController = GenealogyController;
