"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const useAuth_1 = require("../../hooks/useAuth");
const AuthModal_1 = __importDefault(require("../auth/AuthModal"));
const HossLimoLogo = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 60" width="150" height="30">
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#FFD700", stopOpacity: 1 }}/>
        <stop offset="100%" style={{ stopColor: "#DAA520", stopOpacity: 1 }}/>
      </linearGradient>
    </defs>
    <text x="10" y="40" fontFamily="'Cinzel', serif" fontSize="36" fontWeight="700" fill="url(#goldGradient)" letterSpacing="1.5">
      HOSS LIMO
    </text>
    <rect x="10" y="45" width="130" height="1" fill="url(#goldGradient)" opacity="0.7"/>
  </svg>);
const Navbar = () => {
    const { user, logout } = (0, useAuth_1.useAuth)();
    const [isMenuOpen, setIsMenuOpen] = (0, react_1.useState)(false);
    const [showAuthModal, setShowAuthModal] = (0, react_1.useState)(false);
    const [authType, setAuthType] = (0, react_1.useState)("login");
    const location = (0, react_router_dom_1.useLocation)();
    const handleAuthClick = (type) => {
        setAuthType(type);
        setShowAuthModal(true);
    };
    const closeAuthModal = () => {
        setShowAuthModal(false);
    };
    const handleLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield logout();
        }
        catch (error) {
            console.error("Failed to log out", error);
        }
    });
    const isActive = (path) => location.pathname === path;
    const isHomePage = location.pathname === "/";
    // Dynamic text color based on page
    const textColor = isHomePage ? "text-white" : "text-black";
    const hoverColor = "hover:text-gold";
    return (<nav className={`py-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out bg-transparent`}>
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <react_router_dom_1.Link to="/" className="flex items-center">
          <HossLimoLogo />
        </react_router_dom_1.Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <react_router_dom_1.Link to="/" className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${textColor} ${hoverColor} ${isActive("/") ? "text-gold" : ""} hover:scale-105 hover:tracking-wide`} style={{ position: "relative", display: "inline-block" }}>
            HOME
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" style={{ display: "block" }}/>
          </react_router_dom_1.Link>
          <react_router_dom_1.Link to={user ? "/booking" : "#"} onClick={(e) => {
            console.log('Book Now clicked, user:', user); // Add this line
            if (!user) {
                e.preventDefault();
                handleAuthClick("login");
            }
        }} className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${textColor} ${hoverColor} ${isActive("/booking") ? "text-gold" : ""} hover:scale-105 hover:tracking-wide`} style={{ position: "relative", display: "inline-block" }}>
            BOOK NOW
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" style={{ display: "block" }}/>
          </react_router_dom_1.Link>
          <react_router_dom_1.Link to="/fleet" className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${textColor} ${hoverColor} ${isActive("/fleet") ? "text-gold" : ""} hover:scale-105 hover:tracking-wide`} style={{ position: "relative", display: "inline-block" }}>
            OUR FLEET
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" style={{ display: "block" }}/>
          </react_router_dom_1.Link>
          <react_router_dom_1.Link to="/services" className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${textColor} ${hoverColor} ${isActive("/services") ? "text-gold" : ""} hover:scale-105 hover:tracking-wide`} style={{ position: "relative", display: "inline-block" }}>
            WHAT WE OFFER
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" style={{ display: "block" }}/>
          </react_router_dom_1.Link>
          <react_router_dom_1.Link to="/about" className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${textColor} ${hoverColor} ${isActive("/about") ? "text-gold" : ""} hover:scale-105 hover:tracking-wide`} style={{ position: "relative", display: "inline-block" }}>
            OUR STORY
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" style={{ display: "block" }}/>
          </react_router_dom_1.Link>
          {user && (<react_router_dom_1.Link to="/profile" className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${textColor} ${hoverColor} ${isActive("/profile") ? "text-gold" : ""} hover:scale-105 hover:tracking-wide`} style={{ position: "relative", display: "inline-block" }}>
              PROFILE
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" style={{ display: "block" }}/>
            </react_router_dom_1.Link>)}

          {/* Auth Buttons */}
          {user ? (<button onClick={handleLogout} className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${textColor} ${hoverColor} hover:scale-105 hover:tracking-wide`} style={{ position: "relative", display: "inline-block" }}>
              LOGOUT
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" style={{ display: "block" }}/>
            </button>) : (<div className="flex space-x-4 ml-4">
              <button onClick={() => handleAuthClick("login")} className={`group relative uppercase text-sm font-medium transition-all duration-300 ease-in-out ${textColor} ${hoverColor} hover:scale-105 hover:tracking-wide`} style={{ position: "relative", display: "inline-block" }}>
                LOGIN
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" style={{ display: "block" }}/>
              </button>
              <button onClick={() => handleAuthClick("signup")} className="group relative bg-gold bg-opacity-80 hover:bg-opacity-100 text-black px-4 py-1 uppercase text-sm transition-all duration-300 ease-in-out hover:scale-105">
                SIGN UP
              </button>
            </div>)}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className={`w-6 h-6 ${textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>) : (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>)}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (<div className="md:hidden mt-2 py-2 px-4 bg-transparent">
          <react_router_dom_1.Link to="/" className={`group block py-2 transition-all duration-300 ease-in-out ${textColor} ${hoverColor} ${isActive("/") ? "text-gold" : ""} hover:scale-105 hover:tracking-wide`} onClick={() => setIsMenuOpen(false)} style={{ position: "relative", display: "inline-block" }}>
            Home
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" style={{ display: "block" }}/>
          </react_router_dom_1.Link>
          <react_router_dom_1.Link to={user ? "/booking" : "#"} onClick={(e) => {
                if (!user) {
                    e.preventDefault();
                    handleAuthClick("login");
                    setIsMenuOpen(false);
                }
                else {
                    setIsMenuOpen(false);
                }
            }} className={`group block py-2 transition-all duration-300 ease-in-out ${textColor} ${hoverColor} ${isActive("/booking") ? "text-gold" : ""} hover:scale-105 hover:tracking-wide`} style={{ position: "relative", display: "inline-block" }}>
            Book Now
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" style={{ display: "block" }}/>
          </react_router_dom_1.Link>
          <react_router_dom_1.Link to="/fleet" className={`group block py-2 transition-all duration-300 ease-in-out ${textColor} ${hoverColor} ${isActive("/fleet") ? "text-gold" : ""} hover:scale-105 hover:tracking-wide`} onClick={() => setIsMenuOpen(false)} style={{ position: "relative", display: "inline-block" }}>
            Our Fleet
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" style={{ display: "block" }}/>
          </react_router_dom_1.Link>
          <react_router_dom_1.Link to="/services" className={`group block py-2 transition-all duration-300 ease-in-out ${textColor} ${hoverColor} ${isActive("/services") ? "text-gold" : ""} hover:scale-105 hover:tracking-wide`} onClick={() => setIsMenuOpen(false)} style={{ position: "relative", display: "inline-block" }}>
            What We Offer
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" style={{ display: "block" }}/>
          </react_router_dom_1.Link>
          <react_router_dom_1.Link to="/about" className={`group block py-2 transition-all duration-300 ease-in-out ${textColor} ${hoverColor} ${isActive("/about") ? "text-gold" : ""} hover:scale-105 hover:tracking-wide`} onClick={() => setIsMenuOpen(false)} style={{ position: "relative", display: "inline-block" }}>
            Our Story
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" style={{ display: "block" }}/>
          </react_router_dom_1.Link>
          {user && (<react_router_dom_1.Link to="/profile" className={`group block py-2 transition-all duration-300 ease-in-out ${textColor} ${hoverColor} ${isActive("/profile") ? "text-gold" : ""} hover:scale-105 hover:tracking-wide`} onClick={() => setIsMenuOpen(false)} style={{ position: "relative", display: "inline-block" }}>
              Profile
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" style={{ display: "block" }}/>
            </react_router_dom_1.Link>)}

          {user ? (<button onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                }} className={`group block py-2 transition-all duration-300 ease-in-out ${textColor} ${hoverColor} hover:scale-105 hover:tracking-wide`} style={{ position: "relative", display: "inline-block" }}>
              Logout
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" style={{ display: "block" }}/>
            </button>) : (<>
              <button onClick={() => {
                    handleAuthClick("login");
                    setIsMenuOpen(false);
                }} className={`group block py-2 transition-all duration-300 ease-in-out ${textColor} ${hoverColor} hover:scale-105 hover:tracking-wide`} style={{ position: "relative", display: "inline-block" }}>
                Login
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" style={{ display: "block" }}/>
              </button>
              <button onClick={() => {
                    handleAuthClick("signup");
                    setIsMenuOpen(false);
                }} className={`group block py-2 transition-all duration-300 ease-in-out ${textColor} ${hoverColor} hover:scale-105 hover:tracking-wide`} style={{ position: "relative", display: "inline-block" }}>
                Sign Up
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" style={{ display: "block" }}/>
              </button>
            </>)}
        </div>)}

      {/* Auth Modal */}
      <AuthModal_1.default isOpen={showAuthModal} onClose={closeAuthModal} initialView={authType}/>
    </nav>);
};
exports.default = Navbar;
