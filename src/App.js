import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AboutMe from './components/AboutMe';
import ProfessionalExperience from './components/ProfessionalExperience';
import ContactMe from './components/ContactMe';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 检查是否已登录
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAdminAccess = () => {
    setShowAdmin(true);
  };

  if (showAdmin && !isLoggedIn) {
    return <AdminLogin onLogin={setIsLoggedIn} />;
  }

  if (showAdmin && isLoggedIn) {
    return <AdminDashboard onLogout={() => {
      setIsLoggedIn(false);
      setShowAdmin(false);
      localStorage.removeItem('adminToken');
    }} />;
  }

  return (
    <div className="App">
      <Navbar onAdminClick={handleAdminAccess} />
      <main>
        <AboutMe />
        <ProfessionalExperience />
        <ContactMe />
      </main>
    </div>
  );
}

export default App;