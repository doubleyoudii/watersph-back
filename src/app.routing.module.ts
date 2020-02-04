import {
  RegisterController,
  GenealogyController,
  GroupSalesController,
  LedgerController,
  PersonalSalesController,
  ProfileController,
  ForgotPasswordController,
  AdminController,
  CutoffDatesController,
  Soa_summary_incomeController,
  Soa_personal_salesController,
  Soa_goldmineController,
  Soa_diamondmineController,
  Soa_gpdController,
  Soa_royalty_discountController
} from "./controllers";

export const routes = [
  {
    controllers: [
      RegisterController,
      GenealogyController,
      GroupSalesController,
      LedgerController,
      PersonalSalesController,
      ProfileController,
      ForgotPasswordController,
      AdminController,
      CutoffDatesController,
      Soa_summary_incomeController,
      Soa_personal_salesController,
      Soa_goldmineController,
      Soa_diamondmineController,
      Soa_gpdController,
      Soa_royalty_discountController
    ],
    middlewares: [],
    path: ""
  }
];
