import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class ProfileServices {
  @Models("profile") model: any;
  constructor() {}

  async findMember(idMember: any) {
    const memberId = idMember;
    console.log(typeof memberId);
    try {
      const result = await this.model.findOne({ MemberID: memberId });
      console.log(result);

      if (!result) {
        return {
          status: 400,
          message: "Member not found!",
          data: [],
          meta: {}
        };
      }

      return {
        status: 200,
        message: "Valid Member ID",
        data: result,
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
