import React, { useState, createContext, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Map from './pages/Map';
import Login from './pages/Login';

export const AuthContext = createContext(null);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // อ่านสถานะจาก localStorage เมื่อโหลดครั้งแรก
    return localStorage.getItem("isAuthenticated") === "true";
  });

  useEffect(() => {
    // เก็บสถานะ isAuthenticated ใน localStorage ทุกครั้งที่เปลี่ยน
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Map /> : <Navigate to="/login" />,
    },
    {
      path: "login",
      element: <Login />,
    }
  ]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
