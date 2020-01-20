import {
  SampleController,
  RegisterController,
  GenealogyController,
  GroupSalesController,
  LedgerController,
  PersonalSalesController,
  ProfileController,
  ForgotPasswordController,
  AdminController
} from "./controllers";

export const routes = [
  {
    controllers: [
      SampleController,
      RegisterController,
      GenealogyController,
      GroupSalesController,
      LedgerController,
      PersonalSalesController,
      ProfileController,
      ForgotPasswordController,
      AdminController
    ],
    middlewares: [],
    path: ""
  }
];
