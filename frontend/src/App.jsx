import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import HomePage from "./pages/HomePage";
import GroupPage from "./pages/GroupPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./layout/AppLayout";

import { axiosInstance } from "./lib/axios";

const App = () => {

  const { data: authdata, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await axiosInstance("/auth/home");
      return response.data;
    },
    retry: false,
  });

  const isAuthenticated = authdata?.user

  return (
    <>
      <div>
        <Routes>
          <Route element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/groups" element={<GroupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Route>

          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />} />

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>

        <Toaster />
      </div>
    </>
  );
};

export default App;
