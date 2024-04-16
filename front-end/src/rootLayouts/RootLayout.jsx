import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderNav from "../pages/components/header";

function RootLayout() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!false) return navigate("/auth?mode=signUp");
  // }, []);

  return (
    <div>
      <HeaderNav />
      <Outlet />
    </div>
  );
}

export default RootLayout;
