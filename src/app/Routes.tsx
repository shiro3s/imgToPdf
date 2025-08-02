import React from "react";
import { Route, Routes } from "react-router";

import {ImgToPdfPage} from "@/pages/imgToPdf"

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" Component={ImgToPdfPage} />
    </Routes>
  )
}
