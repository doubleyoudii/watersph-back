import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";

@Controller({
  model: "./soa_personal_sales.model",
  route: "/soa_personal_sales",
})
export class Soa_personal_salesController {

  constructor() {}
  
}