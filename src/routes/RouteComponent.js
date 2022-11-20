import React,{lazy} from "react";
import { useRoutes } from "react-router-dom";

const Header = lazy(() => import("../components/Header"));
const Login = lazy(() => import("../components/authentication/Login"));
const SignUp = lazy(() => import("../components/authentication/SignUp"));
const ProtectedRoutes = lazy(() =>
  import("../components/protectedRoutes/ProtectedRoutes")
);
const ForgotPassword = lazy(() =>
  import("../components/authentication/ForgotPassword")
);
const SignInWithMobile = lazy(() =>
  import("../components/authentication/SignInWithMobile")
);

const RouteComponent = () => {
  let allRoutes = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "signup",
      element: <SignUp />,
    },
    {
      path: "slack-app",
      element: (
        <ProtectedRoutes>
          <Header />
        </ProtectedRoutes>
      ),
    },
    {
      path: "signin-mobile",
      element: (
        // <ProtectedRoutes>
          <SignInWithMobile />
        // </ProtectedRoutes>
      ),
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },
  ]);
  return allRoutes;
};

export default RouteComponent;
