import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";

@Controller({
  model: "./soa_summary_income.model",
  route: "/soa_summary_income",
})
export class Soa_summary_incomeController {

  constructor() {}
  
}