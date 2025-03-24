"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const App_1 = __importDefault(require("./App"));
const AuthContext_1 = require("./context/AuthContext"); // Adjust path if necessary
const root = client_1.default.createRoot(document.getElementById('root'));
root.render(<react_1.default.StrictMode>
    <AuthContext_1.AuthProvider>
      <App_1.default />
    </AuthContext_1.AuthProvider>
  </react_1.default.StrictMode>);
