import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";
import { RegisterServices } from "../register/register.service";

const _ = require("lodash");

@Injectable()
export class AdminServices {
  @Models("admin") model: any;
  constructor(private register: RegisterServices) {}

  async createAdmin(body: any) {
    const data = _.pick(body, ["userName", "password"]);

    try {
      const admin = await this.model.create(data);
      const adminfin = await admin.save();

      return {
        status: 200,
        message: "Register Successfully!",
        data: adminfin,
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

  async loginAdmin(body: any) {
    const data = _.pick(body, ["userName", "password"]);
    try {
      const admin: any = await this.model.findOne({ userName: data.userName });

      if (!admin) {
        return {
          status: 404,
          message: "Admin Account does not exist",
          data: [],
          meta: {}
        };
      }

      const payload = {
        _id: admin._id,
        userName: admin.userName
      };

      if (admin.password === data.password) {
        return {
          status: 200,
          message: "Login Success",
          data: payload,
          meta: {}
        };
      } else {
        return {
          status: 404,
          message: "Incorrect Password. Please try again",
          data: [],
          meta: {}
        };
      }
    } catch (error) {
      return {
        status: 400,
        message: error.errmsg ? error.errmsg : error.toString(),
        data: [],
        meta: {}
      };
    }
  }

  async getList() {
    try {
      const result = await this.register.getRegistered();

      return {
        status: 200,
        message: "Get Registered List success",
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

  async getListById(id:any){
    try {
      const result = await this.register.getRegisteredById(id);
      if (!result) {
        return {
          status:200,
          message: "Member does not exist",
          data: [],
          meta: {}
        }
      }

      return {
        status: 200,
        message: "Get Registered by Id",
        data: result,
        meta: {}
      }
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
