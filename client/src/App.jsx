import "./App.css";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {useUserStore} from "./hooks/userStore.js";
import { useEffect } from "react";

function App() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    const checkJWT = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/validateToken`, {
          headers: { "Content-Type": "application/json" },
          method: "GET",
          credentials: "include"
        });
  
        if (response.ok) {
          const data = await response.json();
          setUser(data.userDTO);
          navigate("/"); 
        } else {
          navigate("/login"); 
        }
      } catch (error) {
        console.error("Error checking JWT:", error);
        navigate("/login"); 
      }
    };
  
    checkJWT();
  }, [setUser, navigate]);

  useEffect(() => {
    if (user !== undefined) {
      navigate(user ? "/" : "/login");
    }
  }, [user, navigate]);
  

  return (
    <div className="p-4 h-screen w-screen flex justify-center items-center bg-gray-200">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
