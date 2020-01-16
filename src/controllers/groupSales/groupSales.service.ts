import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class GroupSalesServices {
  @Models("groupSales") model: any;
  constructor() {}
}
