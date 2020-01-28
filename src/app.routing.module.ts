import {
  SampleController,
  RegisterController,
  GenealogyController,
  GroupSalesController,
  LedgerController,
  PersonalSalesController,
  ProfileController,
  ForgotPasswordController,
  AdminController,
  CutoffDatesController
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
      AdminController,
      CutoffDatesController
    ],
    middlewares: [],
    path: ""
  }
];
