
import './App.css'
import Home from './pages/home/Home.jsx'
import Login from './pages/login/Login.jsx'
import SignUp from './pages/signup/SignUp.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {


  return (
    <div className="p-4 h-screen w-screen flex justify-center items-center bg-gray-200">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Toaster/>
      </BrowserRouter>
    </div>
  )
}

export default App
