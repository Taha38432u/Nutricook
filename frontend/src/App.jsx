import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AppLayout from "./ui/AppLayout.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ResetPassword from "./features/Authentication/ResetPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import CreateRecipe from "./pages/CreateRecipe.jsx";
import CheckNutrients from "./features/Recipe/CheckNutrients.jsx";
import ShowRecipes from "./features/Recipe/showRecipes.jsx";
import SingleRecipe from "./pages/SingleRecipe.jsx";
import ShowUserRecipes from "./features/Recipe/ShowUserRecipes.jsx";
import UpdateRecipeForm from "./features/Recipe/UpdateRecipeForm.jsx";
import ShowAllRecipes from "./features/Recipe/ShowAllRecipes.jsx";
import { SocketProvider } from "./services/socketContext.jsx";
import ShowLikedRecipes from "./features/Recipe/LikedRecipes.jsx";
import { ReactivateProvider } from "./features/GlobalContext.jsx";
import Users from "./features/Authentication/Users.jsx";
import Inbox from "./features/Authentication/Inbox.jsx";

// QueryClient setup
const queryClient = new QueryClient({
  queries: {
    staleTime: 0, // Set stale time for data freshness
  },
});

function App() {
  return (
    <ReactivateProvider>
      <QueryClientProvider client={queryClient}>
        {/* React Query DevTools for development, hidden in production */}
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />

        {/* BrowserRouter for managing app routes */}
        <SocketProvider>
          <BrowserRouter>
            <Routes>
              {/* Protected Routes */}
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* Default route */}
                <Route index element={<Navigate replace to="home" />} />

                {/* Admin-only route */}
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="all-recipes"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <ShowAllRecipes />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="users"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <Users />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="inbox"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <Inbox />
                    </ProtectedRoute>
                  }
                />

                {/* Accessible to all authenticated users */}
                <Route path="me" element={<Profile />} />
                <Route path="create" element={<CreateRecipe />} />
                <Route path="check-nutrients" element={<CheckNutrients />} />
                <Route path="home" element={<ShowRecipes />} />
                <Route path="my-recipes" element={<ShowUserRecipes />} />
                <Route path="show/:id" element={<SingleRecipe />} />
                <Route path="edit/:id" element={<UpdateRecipeForm />} />
                <Route path="liked-recipes" element={<ShowLikedRecipes />} />
              </Route>

              {/* Public routes: Login and Signup */}
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="reset-password/:token" element={<ResetPassword />} />
            </Routes>
          </BrowserRouter>
        </SocketProvider>

        {/* React Hot Toast notifications */}
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: `8px` }}
          toastOptions={{
            success: {
              duration: 2000,
            },
            error: {
              duration: 2000,
            },
            style: {
              fontSize: `16px`,
              padding: `16px 24px`,
              maxWidth: `500px`,
              backgroundColor: `#f3f4f6`,
              color: "#4b5563",
            },
          }}
        />
      </QueryClientProvider>
    </ReactivateProvider>
  );
}

export default App;
