"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ServiceCard = ({ service }) => {
    return (<div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
      <div className="h-48 overflow-hidden">
        <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover"/>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-accent font-medium">{service.price}</span>
          <react_router_dom_1.Link to="/booking" className="btn btn-outline text-sm py-2 px-4">
            Book Now
          </react_router_dom_1.Link>
        </div>
      </div>
    </div>);
};
exports.default = ServiceCard;
