import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({ children }) => {
  const useSelectorData = useSelector((state) => state.slackReducer.userToken);
  // const mobileID = useSelector((state) => state.slackReducer.mobileId);


  if (!useSelectorData) {
    return <Navigate to="/" />;
  }
  // if (!mobileID) {
  //   return <Navigate to="/" />;
  // }
  
  return children;
};

export default ProtectedRoutes;
