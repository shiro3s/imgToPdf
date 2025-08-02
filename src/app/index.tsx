import React from "react";
import { BrowserRouter } from "react-router";

import {AppRoutes} from "./Routes"

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
