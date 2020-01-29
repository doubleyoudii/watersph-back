import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";

@Controller({
  model: "./soa_royalty_discount.model",
  route: "/soa_royalty_discount",
})
export class Soa_royalty_discountController {

  constructor() {}
  
}