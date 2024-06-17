import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import "./index.css";
import FamilyIdPage from "./pages/FamilyId.tsx";
import MoreDetailsPage from "./pages/MoreDetails.tsx";
import OTPVerifyPage from "./pages/OTPVerify.tsx";
import SigninPage from "./pages/Signin.tsx";
import SignupPage from "./pages/Signup.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute children={<App />} />,
    children: [
      {
        path: "/otp-verify",
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
    ],
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/signin",
    element: <SigninPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
