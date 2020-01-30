import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class Soa_diamondmineServices {
  @Models("soa_diamondmine") model: any;

  constructor() {}
  async getDiamondmine(id: any, year: any, period: any) {
    //Hard coded year just for testing, to be change
    const data = await this.model.find({
      // Memberid: id,
      Memberid: "QCY19060613",
      YearProcessed: year,
      Period: period
    });
    return data;
  }
}
