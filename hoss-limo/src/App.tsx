import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import OurFleet from './pages/OurFleet';
import { AuthProvider, useAuth } from './hooks/useAuth'; // Update import
import './index.css'; // Adjust the path if needed
const ProfileWithAuth: React.FC = () => {
  const { user } = useAuth();
  return <Profile user={user} />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/profile" element={<ProfileWithAuth />} />
            <Route path="/fleet" element={<OurFleet />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;