import {
  SampleController,
  RegisterController,
  GenealogyController,
  GroupSalesController,
  LedgerController,
  PersonalSalesController,
  ProfileController,
  ForgotPasswordController
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
      ForgotPasswordController
    ],
    middlewares: [],
    path: ""
  }
];
