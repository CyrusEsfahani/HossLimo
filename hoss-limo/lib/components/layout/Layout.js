"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Navbar_1 = __importDefault(require("./Navbar"));
const Footer_1 = __importDefault(require("./Footer"));
const Layout = ({ children }) => {
    return (<div className="flex flex-col min-h-screen">
      <Navbar_1.default />
      <main className="flex-grow">{children}</main>
      <Footer_1.default />
    </div>);
};
exports.default = Layout;
