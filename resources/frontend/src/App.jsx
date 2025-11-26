import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import Logo from './assets/logo.jpg';
import Loader from "./components/Loader"
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import ContactPage from './pages/ContactPage';

import WatsappButton from './components/WatsappButton';

import AdminLogin from "./pages/Admin/AdminLogin";
import ManageInquiries from './pages/Admin/ManageInquiries';

// 🔒 Simple Private Route Wrapper
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/admin/login" />;
}



function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // ✅ Hide WhatsApp button on admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (loading) {
    return (
      <Loader Logo={Logo} />
    );
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/inquiries" element={
          <PrivateRoute><ManageInquiries /></PrivateRoute>
        } />
      </Routes>
      {/* Only show on non-admin routes */}
      {!isAdminRoute && <WatsappButton />}
    </>
  )
}

export default App;
