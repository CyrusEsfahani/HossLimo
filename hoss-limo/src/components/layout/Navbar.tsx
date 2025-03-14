import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AuthModal from '../auth/AuthModal';

const HossLimoLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 60" width="150" height="30">
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#DAA520', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text
      x="10"
      y="40"
      fontFamily="'Cinzel', serif"
      fontSize="36"
      fontWeight="700"
      fill="url(#goldGradient)"
      letterSpacing="1.5"
    >
      HOSS LIMO
    </text>
    <rect
      x="10"
      y="45"
      width="130"
      height="1"
      fill="url(#goldGradient)"
      opacity="0.7"
    />
  </svg>
);

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const location = useLocation();

  const handleAuthClick = (type: 'login' | 'signup') => {
    setAuthType(type);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === '/';

  return (
    <nav
      className={`text-white py-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isHomePage ? 'bg-transparent' : 'bg-black bg-opacity-80'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <HossLimoLogo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${
              isActive('/') ? 'text-gold' : 'text-white hover:text-gold'
            } hover:scale-105 hover:tracking-wide`}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            HOME
            <span
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
              style={{ display: 'block' }}
            />
          </Link>
          <Link
            to="/booking"
            className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${
              isActive('/booking') ? 'text-gold' : 'text-white hover:text-gold'
            } hover:scale-105 hover:tracking-wide`}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            BOOK NOW
            <span
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
              style={{ display: 'block' }}
            />
          </Link>
          <Link
            to="/fleet"
            className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${
              isActive('/fleet') ? 'text-gold' : 'text-white hover:text-gold'
            } hover:scale-105 hover:tracking-wide`}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            OUR FLEET
            <span
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
              style={{ display: 'block' }}
            />
          </Link>
          <Link
            to="/services"
            className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${
              isActive('/services') ? 'text-gold' : 'text-white hover:text-gold'
            } hover:scale-105 hover:tracking-wide`}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            WHAT WE OFFER
            <span
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
              style={{ display: 'block' }}
            />
          </Link>
          <Link
            to="/about"
            className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${
              isActive('/about') ? 'text-gold' : 'text-white hover:text-gold'
            } hover:scale-105 hover:tracking-wide`}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            OUR STORY
            <span
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
              style={{ display: 'block' }}
            />
          </Link>

          {/* Auth Buttons */}
          {user ? (
            <button
              onClick={handleLogout}
              className="group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out text-white hover:text-gold hover:scale-105 hover:tracking-wide"
              style={{ position: 'relative', display: 'inline-block' }}
            >
              LOGOUT
              <span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
                style={{ display: 'block' }}
              />
            </button>
          ) : (
            <div className="flex space-x-4 ml-4">
              <button
                onClick={() => handleAuthClick('login')}
                className="group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out text-white hover:text-gold hover:scale-105 hover:tracking-wide"
                style={{ position: 'relative', display: 'inline-block' }}
              >
                LOGIN
                <span
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
                  style={{ display: 'block' }}
                />
              </button>
              <button
                onClick={() => handleAuthClick('signup')}
                className="group relative bg-gold bg-opacity-80 hover:bg-opacity-100 text-black px-4 py-1 uppercase text-sm transition-all duration-300 ease-in-out hover:scale-105"
              >
                SIGN UP
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden text-white mt-2 py-2 px-4 ${
            isHomePage ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-80'
          }`}
        >
          <Link
            to="/"
            className={`group block py-2 transition-all duration-300 ease-in-out ${
              isActive('/')
                ? 'text-gold'
                : 'text-white hover:text-gold hover:scale-105 hover:tracking-wide'
            }`}
            onClick={() => setIsMenuOpen(false)}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            Home
            <span
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
              style={{ display: 'block' }}
            />
          </Link>
          <Link
            to="/booking"
            className={`group block py-2 transition-all duration-300 ease-in-out ${
              isActive('/booking')
                ? 'text-gold'
                : 'text-white hover:text-gold hover:scale-105 hover:tracking-wide'
            }`}
            onClick={() => setIsMenuOpen(false)}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            Book Now
            <span
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
              style={{ display: 'block' }}
            />
          </Link>
          <Link
            to="/fleet"
            className={`group block py-2 transition-all duration-300 ease-in-out ${
              isActive('/fleet')
                ? 'text-gold'
                : 'text-white hover:text-gold hover:scale-105 hover:tracking-wide'
            }`}
            onClick={() => setIsMenuOpen(false)}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            Our Fleet
            <span
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
              style={{ display: 'block' }}
            />
          </Link>
          <Link
            to="/services"
            className={`group block py-2 transition-all duration-300 ease-in-out ${
              isActive('/services')
                ? 'text-gold'
                : 'text-white hover:text-gold hover:scale-105 hover:tracking-wide'
            }`}
            onClick={() => setIsMenuOpen(false)}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            What We Offer
            <span
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
              style={{ display: 'block' }}
            />
          </Link>
          <Link
            to="/about"
            className={`group block py-2 transition-all duration-300 ease-in-out ${
              isActive('/about')
                ? 'text-gold'
                : 'text-white hover:text-gold hover:scale-105 hover:tracking-wide'
            }`}
            onClick={() => setIsMenuOpen(false)}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            Our Story
            <span
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
              style={{ display: 'block' }}
            />
          </Link>

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="group block py-2 text-white hover:text-gold hover:scale-105 hover:tracking-wide transition-all duration-300 ease-in-out"
              style={{ position: 'relative', display: 'inline-block' }}
            >
              Logout
              <span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
                style={{ display: 'block' }}
              />
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  handleAuthClick('login');
                  setIsMenuOpen(false);
                }}
                className="group block py-2 text-white hover:text-gold hover:scale-105 hover:tracking-wide transition-all duration-300 ease-in-out"
                style={{ position: 'relative', display: 'inline-block' }}
              >
                Login
                <span
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
                  style={{ display: 'block' }}
                />
              </button>
              <button
                onClick={() => {
                  handleAuthClick('signup');
                  setIsMenuOpen(false);
                }}
                className="group block py-2 text-gold font-medium hover:scale-105 transition-all duration-300 ease-in-out"
                style={{ position: 'relative', display: 'inline-block' }}
              >
                Sign Up
                <span
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
                  style={{ display: 'block' }}
                />
              </button>
            </>
          )}
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={closeAuthModal}
        initialView={authType} 
      />
    </nav>
  );
};

export default Navbar;
