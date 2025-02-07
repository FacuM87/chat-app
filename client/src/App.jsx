import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useUserStore } from "./hooks/userStore.js";
import { useEffect } from "react";
import Footer from "./components/Footer.jsx";

function App() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  -useEffect(() => {
    const checkJWT = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_AUTH_URL}/validateToken`,
          {
            headers: { "Content-Type": "application/json" },
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status === 401) {
          await setUser(null);
          return;
        }

        if (!response.ok) {
          return;
        }

        if (response.ok) {
          const data = await response.json();
          await setUser(data.userDTO);
        } else {
          await setUser(null);
        }
      } catch (error) {
        toast.error(error.message);
        await setUser(null);
      }
    };

    checkJWT();
  }, [setUser]);

  return (
    <div className="p-4 min-h-screen flex flex-col bg-gray-200">
      <div className="flex-grow flex justify-center items-center">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to={"/"} /> : <SignUp />}
          />
        </Routes>
      </div>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
