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
const core_1 = require("@mayajs/core");
const mongo_1 = require("@mayajs/mongo");
const cutoffDates_service_1 = require("../cutoffDates/cutoffDates.service");
const _ = require("lodash");
let GroupSalesServices = class GroupSalesServices {
  constructor(cutoff) {
    this.cutoff = cutoff;
  }
  getDates(userId) {
    return __awaiter(this, void 0, void 0, function*() {
      const id = userId;
      try {
        const partialFilter = yield this.model.find({ MemberID: id });
        return {
          status: 200,
          message: "Personal Sales Fetch by id",
          data: partialFilter,
          meta: {}
        };
        // const dateList = await this.cutoff.passDate();
        // return {
        //   status: 200,
        //   message: "Dates fetch",
        //   data: dateList,
        //   meta: {}
        // };
      } catch (error) {
        return {
          status: 400,
          message: error.errmsg ? error.errmsg : error.toString(),
          data: [],
          meta: {}
        };
      }
    });
  }
  getGroup(requests) {
    return __awaiter(this, void 0, void 0, function*() {
      const parameter = requests;
      const paramDate = Number(parameter.date);
      const paramPeriod = Number(parameter.period);
      function removeDuplicates(array) {
        let x = {};
        array.forEach(function(i) {
          if (!x[i]) {
            x[i] = true;
          }
        });
        return Object.keys(x);
      }
      try {
        const groupData = yield this.model
          .find({
            MemberID: parameter.id,
            Yearprocessed: paramDate,
            Periodno: paramPeriod
          })
          .sort({ Level: 1 });
        return {
          status: 200,
          message: "Fetch Group Sales based on Date From",
          data: groupData,
          meta: {}
        };
      } catch (error) {
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
__decorate(
  [mongo_1.Models("groupSales"), __metadata("design:type", Object)],
  GroupSalesServices.prototype,
  "model",
  void 0
);
GroupSalesServices = __decorate(
  [
    core_1.Injectable(),
    __metadata("design:paramtypes", [cutoffDates_service_1.CutoffDatesServices])
  ],
  GroupSalesServices
);
exports.GroupSalesServices = GroupSalesServices;
