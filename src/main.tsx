import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import OTPVerifyPage from "./pages/OTPVerify.tsx";
import SigninPage from "./pages/Signin.tsx";
import SignupPage from "./pages/Signup.tsx";
import FamilyIdPage from "./pages/FamilyId.tsx";
import MoreDetailsPage from "./pages/MoreDetails.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/signin",
    element: <SigninPage />,
  },
  {
    path: "/otpverify",
    element: <OTPVerifyPage />,
  },
  {
    path: "/details",
    element: <MoreDetailsPage />,
  },
  {
    path: "/familyid",
    element: <FamilyIdPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
