import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'
import AdminDashboard from './pages/AdminDashboard'
import Chat from './pages/Chat'
import { ToastContainer } from 'react-toastify'
import { useState, useEffect } from 'react'
import { auth } from './components/firebase'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/chat" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
