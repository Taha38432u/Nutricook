import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../services/authentication/useUser.js";

function ProtectedRoute({ children, requiredRole }) {
  const { isLoading, user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to signup if not authenticated
    if (!isAuthenticated && !isLoading) {
      navigate("/signup");
    }
    // Redirect to home if the user's role does not match the required role
    else if (
      requiredRole &&
      isAuthenticated &&
      !isLoading &&
      user?.user?.role !== requiredRole
    ) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, user?.user?.role, requiredRole, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isAuthenticated && (!requiredRole || user?.user?.role === requiredRole)) {
    return children;
  }

  // Fallback in case of unexpected errors
  return null;
}

export default ProtectedRoute;
