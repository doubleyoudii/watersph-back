"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("./controllers");
exports.routes = [
    {
        controllers: [
            controllers_1.RegisterController,
            controllers_1.GenealogyController,
            controllers_1.GroupSalesController,
            controllers_1.LedgerController,
            controllers_1.PersonalSalesController,
            controllers_1.ProfileController,
            controllers_1.ForgotPasswordController,
            controllers_1.AdminController,
            controllers_1.CutoffDatesController,
            controllers_1.Soa_summary_incomeController,
            controllers_1.Soa_personal_salesController,
            controllers_1.Soa_goldmineController,
            controllers_1.Soa_diamondmineController,
            controllers_1.Soa_gpdController,
            controllers_1.Soa_royalty_discountController
        ],
        middlewares: [],
        path: ""
    }
];
