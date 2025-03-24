"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Header = () => {
    return (<header className="bg-gray-900 text-white py-4">
      <div className="container-custom flex justify-between items-center">
        <react_router_dom_1.Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Hoss Limo" className="h-10"/>
          <span className="ml-2 text-xl font-serif font-bold">Hoss Limo</span>
        </react_router_dom_1.Link>
        <nav>
          <ul className="flex space-x-6">
            <li><react_router_dom_1.Link to="/" className="hover:text-gold">Home</react_router_dom_1.Link></li>
            <li><react_router_dom_1.Link to="/services" className="hover:text-gold">What We Offer</react_router_dom_1.Link></li>
            <li><react_router_dom_1.Link to="/about" className="hover:text-gold">Our Story</react_router_dom_1.Link></li>
            <li><react_router_dom_1.Link to="/contact" className="hover:text-gold">Contact</react_router_dom_1.Link></li>
            <li><react_router_dom_1.Link to="/booking" className="hover:text-gold">Book Now</react_router_dom_1.Link></li>
          </ul>
        </nav>
      </div>
    </header>);
};
exports.default = Header;
