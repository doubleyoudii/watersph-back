import {
  SampleController,
  RegisterController,
  GenealogyController,
  GroupSalesController,
  LedgerController,
  PersonalSalesController,
  ProfileController
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
      ProfileController
    ],
    middlewares: [],
    path: ""
  }
];
