import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { PredictComponent } from "./pages/predict/predict.component";

export const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "predict",
    component: PredictComponent,
  },
];
