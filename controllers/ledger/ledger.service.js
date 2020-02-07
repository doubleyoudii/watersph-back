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
const cutoffDates_service_1 = require("../cutoffDates/cutoffDates.service");
const soa_summary_income_service_1 = require("../soa_summary_income/soa_summary_income.service");
const soa_personal_sales_service_1 = require("../soa_personal_sales/soa_personal_sales.service");
const soa_goldmine_service_1 = require("../soa_goldmine/soa_goldmine.service");
const soa_diamondmine_service_1 = require("../soa_diamondmine/soa_diamondmine.service");
const soa_gpd_service_1 = require("../soa_gpd/soa_gpd.service");
const soa_royalty_discount_service_1 = require("../soa_royalty_discount/soa_royalty_discount.service");
let LedgerServices = class LedgerServices {
    constructor(cutoff, sumInc, pSales, goldM, diaomondM, gpd, royaltyDisc) {
        this.cutoff = cutoff;
        this.sumInc = sumInc;
        this.pSales = pSales;
        this.goldM = goldM;
        this.diaomondM = diaomondM;
        this.gpd = gpd;
        this.royaltyDisc = royaltyDisc;
    }
    getFilter(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = userId;
            try {
                const partialFilter = yield this.sumInc.findID(id);
                return {
                    status: 200,
                    message: "Ledger by Summary Fetch by id",
                    data: partialFilter,
                    meta: {}
                };
                // const data = await this.cutoff.passYearAndPeriod();
                // return {
                //   status: 200,
                //   message: "Test Year and period",
                //   data: data,
                //   meta: {}
                // };
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
    getSoa(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqData = params;
            try {
                const sumIncData = yield this.sumInc.getSummary(reqData.id, reqData.year, reqData.period);
                const PerSalesData = yield this.pSales.getPersonalSales(reqData.id, reqData.year, reqData.period);
                const goldData = yield this.goldM.getGoldmine(reqData.id, reqData.year, reqData.period);
                const diamondData = yield this.diaomondM.getDiamondmine(reqData.id, reqData.year, reqData.period);
                const gpdData = yield this.gpd.getGpd(reqData.id, reqData.year, reqData.period);
                const royaltyData = yield this.royaltyDisc.getRoyaltyDiscount(reqData.id, reqData.year, reqData.period);
                return {
                    status: 200,
                    message: "Fetch Ledger usind id year, period",
                    data: {
                        summaryIncome: sumIncData,
                        PersonalSales: PerSalesData,
                        GoldMine: goldData,
                        DiamondMine: diamondData,
                        GPD: gpdData,
                        RoyaltyDiscount: royaltyData
                    },
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
    mongo_1.Models("ledger"),
    __metadata("design:type", Object)
], LedgerServices.prototype, "model", void 0);
LedgerServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [cutoffDates_service_1.CutoffDatesServices,
        soa_summary_income_service_1.Soa_summary_incomeServices,
        soa_personal_sales_service_1.Soa_personal_salesServices,
        soa_goldmine_service_1.Soa_goldmineServices,
        soa_diamondmine_service_1.Soa_diamondmineServices,
        soa_gpd_service_1.Soa_gpdServices,
        soa_royalty_discount_service_1.Soa_royalty_discountServices])
], LedgerServices);
exports.LedgerServices = LedgerServices;
