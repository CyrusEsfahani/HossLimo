"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Layout_1 = __importDefault(require("./components/layout/Layout"));
const Home_1 = __importDefault(require("./pages/Home"));
const Services_1 = __importDefault(require("./pages/Services"));
const About_1 = __importDefault(require("./pages/About"));
const Contact_1 = __importDefault(require("./pages/Contact"));
const Booking_1 = __importDefault(require("./pages/Booking"));
const Profile_1 = __importDefault(require("./pages/Profile"));
const useAuth_1 = require("./hooks/useAuth"); // Update import
require("./index.css"); // Adjust the path if needed
const ProfileWithAuth = () => {
    const { user } = (0, useAuth_1.useAuth)();
    return <Profile_1.default user={user}/>;
};
const App = () => {
    return (<useAuth_1.AuthProvider>
      <react_router_dom_1.BrowserRouter>
        <Layout_1.default>
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/" element={<Home_1.default />}/>
            <react_router_dom_1.Route path="/services" element={<Services_1.default />}/>
            <react_router_dom_1.Route path="/about" element={<About_1.default />}/>
            <react_router_dom_1.Route path="/contact" element={<Contact_1.default />}/>
            <react_router_dom_1.Route path="/booking" element={<Booking_1.default />}/>
            <react_router_dom_1.Route path="/profile" element={<ProfileWithAuth />}/>
          </react_router_dom_1.Routes>
        </Layout_1.default>
      </react_router_dom_1.BrowserRouter>
    </useAuth_1.AuthProvider>);
};
exports.default = App;
