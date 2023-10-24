import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function RootLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!false) return navigate("/auth?mode=signUp");
  }, []);

  return (
    <div>
      header
      <Outlet />
    </div>
  );
}

export default RootLayout;
