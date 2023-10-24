import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./rootLayouts/RootLayout";
import AuthProvider from "./pages/auth/AuthProvider";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [{ index: true, element: <HomePage /> }],
    },
    { path: "/auth", element: <AuthProvider /> },
  ]);

  return <RouterProvider router={route} />;
}

export default App;
