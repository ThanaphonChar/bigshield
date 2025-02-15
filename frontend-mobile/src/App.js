import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin';
import Home from './components/Home';
import Info from './components/Info'; // หน้า Info หลัก

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/info" element={<Info />} /> {/* Route เดียวสำหรับ Info */}
      </Routes>
    </Router>
  );
}

export default App;
