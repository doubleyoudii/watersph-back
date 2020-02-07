import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";
import { CutoffDatesServices } from "../cutoffDates/cutoffDates.service";
import { Soa_summary_incomeServices } from "../soa_summary_income/soa_summary_income.service";
import { Soa_personal_salesServices } from "../soa_personal_sales/soa_personal_sales.service";
import { Soa_goldmineServices } from "../soa_goldmine/soa_goldmine.service";
import { Soa_diamondmineServices } from "../soa_diamondmine/soa_diamondmine.service";
import { Soa_gpdServices } from "../soa_gpd/soa_gpd.service";
import { Soa_royalty_discountServices } from "../soa_royalty_discount/soa_royalty_discount.service";

@Injectable()
export class LedgerServices {
  @Models("ledger") model: any;
  constructor(
    private cutoff: CutoffDatesServices,
    private sumInc: Soa_summary_incomeServices,
    private pSales: Soa_personal_salesServices,
    private goldM: Soa_goldmineServices,
    private diaomondM: Soa_diamondmineServices,
    private gpd: Soa_gpdServices,
    private royaltyDisc: Soa_royalty_discountServices
  ) {}

  async getFilter(userId: any) {
    const id = userId;

    try {
      const partialFilter = await this.sumInc.findID({ MemberID: id });

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
    } catch (error) {
      return {
        status: 400,
        message: error.errmsg ? error.errmsg : error.toString(),
        data: [],
        meta: {}
      };
    }
  }

  async getSoa(params: any) {
    const reqData = params;
    try {
      const sumIncData = await this.sumInc.getSummary(
        reqData.id,
        reqData.year,
        reqData.period
      );
      const PerSalesData = await this.pSales.getPersonalSales(
        reqData.id,
        reqData.year,
        reqData.period
      );
      const goldData = await this.goldM.getGoldmine(
        reqData.id,
        reqData.year,
        reqData.period
      );
      const diamondData = await this.diaomondM.getDiamondmine(
        reqData.id,
        reqData.year,
        reqData.period
      );
      const gpdData = await this.gpd.getGpd(
        reqData.id,
        reqData.year,
        reqData.period
      );
      const royaltyData = await this.royaltyDisc.getRoyaltyDiscount(
        reqData.id,
        reqData.year,
        reqData.period
      );

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
    } catch (error) {
      return {
        status: 400,
        message: error.errmsg ? error.errmsg : error.toString(),
        data: [],
        meta: {}
      };
    }
  }
}
