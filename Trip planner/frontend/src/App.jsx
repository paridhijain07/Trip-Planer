import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { loginSuccess } from "./store/authSlice";

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  const accessToken = localStorage.getItem("accessToken");

  if (storedUser === "undefined") {
    localStorage.removeItem("user");
    return;
  }

  if (storedUser && accessToken) {
    try {
      const user = JSON.parse(storedUser);
      dispatch(loginSuccess({ user, accessToken }));
    } catch (error) {
      console.error("Invalid user data in localStorage");
    }
  }
}, [dispatch]);



  return (
    <>
      <NavBar />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
