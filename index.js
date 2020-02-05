"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_module_1 = require("./app.module");
const core_1 = require("@mayajs/core");
const server = new core_1.MayaJS(app_module_1.AppModule);
const prod = process.env.NODE_ENV === "production";
server.prodMode(prod).start();
