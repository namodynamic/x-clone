import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import LoginPage from "./pages/auth/login/LoginPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";

import RightPanel from "./components/common/RightPanel";
import Sidebar from "./components/common/Sidebar";
import Bottombar from "./components/common/Bottombar";

import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";
import Topbar from "./components/common/Topbar";

function App() {
  const { data: authUser, isLoading } = useQuery({
    // we use queryKey to give a unique name to our query and refer to it later
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) throw new Error(data.error || "Something went wrong");

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <main>
      {authUser && <Topbar />}
      <div className="flex max-w-6xl mx-auto">
        {/* common component, because it's not wrapped with routes */}
        {authUser && <Sidebar />}

        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/sign-up"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/notifications"
            element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:username"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Routes>

        {authUser && <RightPanel />}
        <Toaster />
      </div>
      {authUser && <Bottombar />}
    </main>
  );
}

export default App;
