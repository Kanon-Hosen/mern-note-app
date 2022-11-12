import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router";
import { auth } from "../config/firebaseConfig";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 rounded-full animate-pulse bg-teal-500"></div>
            <div className="w-4 h-4 rounded-full animate-pulse bg-teal-500"></div>
            <div className="w-4 h-4 rounded-full animate-pulse bg-teal-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
