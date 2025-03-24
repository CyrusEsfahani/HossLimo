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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Contact = () => {
    const [formData, setFormData] = (0, react_1.useState)({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = (0, react_1.useState)(false);
    const handleChange = (e) => {
        setFormData(Object.assign(Object.assign({}, formData), { [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your server
        console.log(formData);
        setSubmitted(true);
    };
    return (<div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      {submitted ? (<p className="text-lg text-gray-700">Thank you for contacting us! We will get back to you soon.</p>) : (<form onSubmit={handleSubmit} className="max-w-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-md" value={formData.name} onChange={handleChange} required/>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-md" value={formData.email} onChange={handleChange} required/>
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea id="message" name="message" rows={5} className="w-full px-3 py-2 border rounded-md" value={formData.message} onChange={handleChange} required/>
          </div>
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>)}
    </div>);
};
exports.default = Contact;
