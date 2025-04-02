import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AuthModal from "../auth/AuthModal";

const HossLimoLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 60"
    width="150"
    height="30"
  >
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#DAA520", stopOpacity: 1 }} />
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
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const location = useLocation();

  const handleAuthClick = (type: "login" | "signup") => {
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
      console.error("Failed to log out", error);
    }
  };

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === "/";

  // Dynamic text color based on page
  const textColor = isHomePage ? "text-white" : "text-black";
  const hoverColor = "hover:text-gold";

  return (
    <nav
      className={`py-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out bg-transparent`}
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
            className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${textColor} ${hoverColor} ${
              isActive("/") ? "text-gold" : ""
            } hover:scale-105 hover:tracking-wide`}
            style={{ position: "relative", display: "inline-block" }}
          >
            HOME
            <span
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
              style={{ display: "block" }}
            />
          </Link>
          <Link
            to={user ? "/booking" : "#"}
            onClick={(e) => {
              console.log('Book Now clicked, user:', user);
              if (!user) {
                e.preventDefault();
                handleAuthClick("login");
              }
            }}
            className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${textColor} ${hoverColor} ${
              isActive("/booking") ? "text-gold" : ""
            } hover:scale-105 hover:tracking-wide`}
            style={{ position: "relative", display: "inline-block" }}
          >
            BOOK NOW
            <span
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
              style={{ display: "block" }}
            />
          </Link>
          <Link
            to="/fleet"
            className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${textColor} ${hoverColor} ${
              isActive("/fleet") ? "text-gold" : ""
            } hover:scale-105 hover:tracking-wide`}
            style={{ position: "relative", display: "inline-block" }}
          >
            OUR FLEET
            <span
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
              style={{ display: "block" }}
            />
          </Link>
          <Link
            to="/services"
            className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${textColor} ${hoverColor} ${
              isActive("/services") ? "text-gold" : ""
            } hover:scale-105 hover:tracking-wide`}
            style={{ position: "relative", display: "inline-block" }}
          >
            WHAT WE OFFER
            <span
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
              style={{ display: "block" }}
            />
          </Link>
          <Link
            to="/about"
            className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${textColor} ${hoverColor} ${
              isActive("/about") ? "text-gold" : ""
            } hover:scale-105 hover:tracking-wide`}
            style={{ position: "relative", display: "inline-block" }}
          >
            OUR STORY
            <span
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
              style={{ display: "block" }}
            />
          </Link>
          {user && (
            <Link
              to="/profile"
              className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${textColor} ${hoverColor} ${
                isActive("/profile") ? "text-gold" : ""
              } hover:scale-105 hover:tracking-wide`}
              style={{ position: "relative", display: "inline-block" }}
            >
              PROFILE
              <span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
                style={{ display: "block" }}
              />
            </Link>
          )}

          {/* Auth Buttons */}
          {user ? (
            <button
              onClick={handleLogout}
              className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${textColor} ${hoverColor} hover:scale-105 hover:tracking-wide`}
              style={{ position: "relative", display: "inline-block" }}
            >
              LOGOUT
              <span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
                style={{ display: "block" }}
              />
            </button>
          ) : (
            <div className="flex space-x-4 ml-4">
              <button
                onClick={() => handleAuthClick("login")}
                className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${textColor} ${hoverColor} hover:scale-105 hover:tracking-wide`}
                style={{ position: "relative", display: "inline-block" }}
              >
                LOGIN
                <span
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"
                  style={{ display: "block" }}
                />
              </button>
              <button
                onClick={() => handleAuthClick("signup")}
                className="group relative bg-gold bg-opacity-80 hover:bg-opacity-100 text-black px-4 py-1 uppercase text-sm transition-all duration-300 ease-in-out hover:scale-105"
              >
                SIGN UP
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button and Sliding Drawer */}
        <div className="md:hidden fixed z-50">
          {/* Hamburger Button */}
          <button
            className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className={`w-6 h-6 ${textColor}`}
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

          {/* Sliding Drawer Overlay */}
          {isMenuOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />
          )}

          {/* Sliding Drawer Menu */}
          <div
            className={`
              fixed top-0 right-0 w-64 h-full 
              bg-white dark:bg-gray-800 
              shadow-lg 
              transform transition-transform duration-300 ease-in-out
              ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
              z-50 p-6
            `}
          >
            <div className="flex flex-col space-y-4 mt-12">
              <Link
                to="/"
                className={`
                  group relative block py-2 text-lg uppercase
                  ${textColor} ${hoverColor}
                  ${isActive("/") ? "text-gold" : ""}
                  transition-all duration-300 ease-in-out
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>

              <Link
                to={user ? "/booking" : "#"}
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    handleAuthClick("login");
                    setIsMenuOpen(false);
                  } else {
                    setIsMenuOpen(false);
                  }
                }}
                className={`
                  group relative block py-2 text-lg uppercase
                  ${textColor} ${hoverColor}
                  ${isActive("/booking") ? "text-gold" : ""}
                  transition-all duration-300 ease-in-out
                `}
              >
                Book Now
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>

              <Link
                to="/fleet"
                className={`
                  group relative block py-2 text-lg uppercase
                  ${textColor} ${hoverColor}
                  ${isActive("/fleet") ? "text-gold" : ""}
                  transition-all duration-300 ease-in-out
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                Our Fleet
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>

              <Link
                to="/services"
                className={`
                  group relative block py-2 text-lg uppercase
                  ${textColor} ${hoverColor}
                  ${isActive("/services") ? "text-gold" : ""}
                  transition-all duration-300 ease-in-out
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                What We Offer
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>

              <Link
                to="/about"
                className={`
                  group relative block py-2 text-lg uppercase
                  ${textColor} ${hoverColor}
                  ${isActive("/about") ? "text-gold" : ""}
                  transition-all duration-300 ease-in-out
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                Our Story
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>

              {user && (
                <Link
                  to="/profile"
                  className={`
                    group relative block py-2 text-lg uppercase
                    ${textColor} ${hoverColor}
                    ${isActive("/profile") ? "text-gold" : ""}
                    transition-all duration-300 ease-in-out
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              )}

              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className={`
                    group relative block py-2 text-lg uppercase text-left
                    ${textColor} ${hoverColor}
                    transition-all duration-300 ease-in-out
                  `}
                >
                  Logout
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      handleAuthClick("login");
                      setIsMenuOpen(false);
                    }}
                    className={`
                      group relative block py-2 text-lg uppercase text-left
                      ${textColor} ${hoverColor}
                      transition-all duration-300 ease-in-out
                    `}
                  >
                    Login
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </button>
                  <button
                    onClick={() => {
                      handleAuthClick("signup");
                      setIsMenuOpen(false);
                    }}
                    className={`
                      group relative block py-2 text-lg uppercase text-left
                      ${textColor} ${hoverColor}
                      transition-all duration-300 ease-in-out
                    `}
                  >
                    Sign Up
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

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