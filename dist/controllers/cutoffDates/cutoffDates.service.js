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
let CutoffDatesServices = class CutoffDatesServices {
    constructor() { }
    getDateTest() {
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
            try {
                const dates = yield this.model.find();
                return {
                    status: 200,
                    message: "Test Dates",
                    data: dates,
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
    passDate() {
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
            const data = yield this.model.find();
            let partialFilter = JSON.stringify(data);
            let b2bfilter = JSON.parse(partialFilter);
            let period = [];
            let year = [];
            const pickedFilter = b2bfilter.map((el) => {
                const picked = _.pick(el, [
                    "DateFrom",
                    "DateTo",
                    "PeriodNo",
                    "YEARPROCESSED"
                ]);
                return picked;
            });
            pickedFilter.forEach((el) => {
                period.push(el.PeriodNo);
                year.push(el.YEARPROCESSED);
            });
            const fnalYear = removeDuplicates(year);
            const fnalPeriod = removeDuplicates(period);
            let sortedPeriod = fnalPeriod.sort(function (a, b) {
                return a - b;
            });
            let sortedYear = fnalYear.sort(function (a, b) {
                return a - b;
            });
            return {
                year: sortedYear,
                period: sortedPeriod
            };
        });
    }
    passYearAndPeriod() {
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
            const data = yield this.model.find();
            let partialFilter = JSON.stringify(data);
            let b2bfilter = JSON.parse(partialFilter);
            let year = [];
            let period = [];
            const pickedFilter = b2bfilter.map((el) => {
                const picked = _.pick(el, ["DateFrom", "DateTo", "PeriodNo"]);
                return picked;
            });
            pickedFilter.forEach((el) => {
                let splitYear = el.DateTo.split("/");
                year.push(splitYear[2]);
                period.push(el.PeriodNo);
            });
            const fnalYear = removeDuplicates(year);
            const fnalPeriod = removeDuplicates(period);
            const sortedYear = fnalYear.sort(function (a, b) {
                return a - b;
            });
            const sortedPeriod = fnalPeriod.sort(function (a, b) {
                return a - b;
            });
            return {
                year: sortedYear,
                period: sortedPeriod
            };
        });
    }
};
__decorate([
    mongo_1.Models("cutoffDates"),
    __metadata("design:type", Object)
], CutoffDatesServices.prototype, "model", void 0);
CutoffDatesServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], CutoffDatesServices);
exports.CutoffDatesServices = CutoffDatesServices;
