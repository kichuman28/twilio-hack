import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import "./index.css";
import CreatePost from "./pages/CreatePost.tsx";
import FamilyIdPage from "./pages/FamilyId.tsx";
import MoreDetailsPage from "./pages/MoreDetails.tsx";
import OTPVerifyPage from "./pages/OTPVerify.tsx";
import SigninPage from "./pages/Signin.tsx";
import SignupPage from "./pages/Signup.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/create-post",
        element: <CreatePost />,
      },
      {
        path: "familyid",
        element: <FamilyIdPage />,
      },
    ],
  },
  {
    path: "otp-verify",
    element: <OTPVerifyPage />,
  },
  {
    path: "more-details",
    element: <MoreDetailsPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "signin",
    element: <SigninPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
