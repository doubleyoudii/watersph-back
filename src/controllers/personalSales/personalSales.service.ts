import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class PersonalSalesServices {
  @Models("personalSales") model: any;
  constructor() {}
}
