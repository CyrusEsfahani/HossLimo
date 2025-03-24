"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const react_router_dom_1 = require("react-router-dom");
const App_1 = __importDefault(require("./App"));
test('renders Hoss Limo title', () => {
    (0, react_2.render)(<react_router_dom_1.MemoryRouter>
      <App_1.default />
    </react_router_dom_1.MemoryRouter>);
    const titleElement = react_2.screen.getByText(/Hoss Limo/i);
    expect(titleElement).toBeInTheDocument();
});
