import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class Soa_royalty_discountServices {
  @Models("soa_royalty_discount") model: any;

  constructor() {}
  async getRoyaltyDiscount(id: any, year: any, period: any) {
    const data = await this.model.find({
      Memberid: id,
      Yearprocessed: year,
      period: period
    });

    return data;
  }
}
