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
Object.defineProperty(exports, "__esModule", { value: true });
// src/components/auth/AuthSlider.tsx
const react_1 = __importStar(require("react"));
require("./AuthSlider.css");
const formik_1 = require("formik");
const Yup = __importStar(require("yup"));
const auth_1 = require("firebase/auth");
const firebase_1 = require("../../services/firebase");
const useAuth_1 = require("../../hooks/useAuth");
const AuthSlider = ({ onClose, initialView = 'login' }) => {
    const [signUpMode, setSignUpMode] = (0, react_1.useState)(initialView === 'signup');
    const [errorMessage, setErrorMessage] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const { login, signup } = (0, useAuth_1.useAuth)();
    const provider = new auth_1.GoogleAuthProvider();
    // Google sign-in handler
    const handleGoogleSignIn = () => __awaiter(void 0, void 0, void 0, function* () {
        setIsLoading(true);
        setErrorMessage(null);
        try {
            yield (0, auth_1.signInWithPopup)(firebase_1.auth, provider);
            onClose();
        }
        catch (error) {
            setErrorMessage(error.message || 'Failed to sign in with Google.');
        }
        finally {
            setIsLoading(false);
        }
    });
    // Login form with Formik
    const formikLogin = (0, formik_1.useFormik)({
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: (values) => __awaiter(void 0, void 0, void 0, function* () {
            setIsLoading(true);
            setErrorMessage(null);
            try {
                yield login(values.email, values.password);
                onClose();
            }
            catch (error) {
                setErrorMessage(error.message);
            }
            finally {
                setIsLoading(false);
            }
        }),
    });
    // Signup form with Formik (adjusted to match Image 2)
    const formikSignup = (0, formik_1.useFormik)({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: (values) => __awaiter(void 0, void 0, void 0, function* () {
            setIsLoading(true);
            setErrorMessage(null);
            try {
                // Assuming signup accepts displayName as firstName + lastName
                yield signup(values.email, values.password, `${values.firstName} ${values.lastName}`);
                onClose();
            }
            catch (error) {
                setErrorMessage(error.message);
            }
            finally {
                setIsLoading(false);
            }
        }),
    });
    return (<div className={`container ${signUpMode ? 'sign-up-mode' : ''}`}>
      {/* Close button */}
      <button className="close-btn" onClick={onClose}>×</button>

      {/* Forms Container */}
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign In Form */}
          <form onSubmit={formikLogin.handleSubmit} className="sign-in-form">
            <h2>Log In</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" name="email" onChange={formikLogin.handleChange} onBlur={formikLogin.handleBlur} value={formikLogin.values.email}/>
            </div>
            {formikLogin.touched.email && formikLogin.errors.email && (<div className="error-message">{formikLogin.errors.email}</div>)}
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" name="password" onChange={formikLogin.handleChange} onBlur={formikLogin.handleBlur} value={formikLogin.values.password}/>
            </div>
            {formikLogin.touched.password && formikLogin.errors.password && (<div className="error-message">{formikLogin.errors.password}</div>)}
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
            <p className="social-text">or register with</p>
            <div className="social-media">
              <button type="button" className="social-btn" onClick={handleGoogleSignIn} disabled={isLoading}>
                <i className="fab fa-google"></i> Google
              </button>
              {/* Add Apple button if desired */}
            </div>
            {errorMessage && <div className="error-message" style={{ marginTop: '10px' }}>{errorMessage}</div>}
          </form>

          {/* Sign Up Form */}
          <form onSubmit={formikSignup.handleSubmit} className="sign-up-form">
            <h2>Create an account</h2>
            <p className="toggle-text">
              Already have an account? <span onClick={() => setSignUpMode(false)}>Log in</span>
            </p>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="First name" name="firstName" onChange={formikSignup.handleChange} onBlur={formikSignup.handleBlur} value={formikSignup.values.firstName}/>
            </div>
            {formikSignup.touched.firstName && formikSignup.errors.firstName && (<div className="error-message">{formikSignup.errors.firstName}</div>)}
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Last name" name="lastName" onChange={formikSignup.handleChange} onBlur={formikSignup.handleBlur} value={formikSignup.values.lastName}/>
            </div>
            {formikSignup.touched.lastName && formikSignup.errors.lastName && (<div className="error-message">{formikSignup.errors.lastName}</div>)}
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" name="email" onChange={formikSignup.handleChange} onBlur={formikSignup.handleBlur} value={formikSignup.values.email}/>
            </div>
            {formikSignup.touched.email && formikSignup.errors.email && (<div className="error-message">{formikSignup.errors.email}</div>)}
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" name="password" onChange={formikSignup.handleChange} onBlur={formikSignup.handleBlur} value={formikSignup.values.password}/>
            </div>
            {formikSignup.touched.password && formikSignup.errors.password && (<div className="error-message">{formikSignup.errors.password}</div>)}
            <div className="checkbox-container">
              <input type="checkbox" id="terms" required/>
              <label htmlFor="terms">I agree to the Terms & Conditions</label>
            </div>
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create account'}
            </button>
            <p className="social-text">or register with</p>
            <div className="social-media">
              <button type="button" className="social-btn" onClick={handleGoogleSignIn} disabled={isLoading}>
                <i className="fab fa-google"></i> Google
              </button>
              {/* Add Apple button if desired */}
            </div>
            {errorMessage && <div className="error-message" style={{ marginTop: '10px' }}>{errorMessage}</div>}
          </form>
        </div>
      </div>

      {/* Panels Container */}
      <div className="panels-container">
        {/* Panel for sign-up mode (encourages login) */}
        <div className="panel panel-left">
          <div className="content">
            <h3>Already A member?</h3>
            <p>Sign in with your email and password.</p>
            <button className="btn transparent" onClick={() => setSignUpMode(false)}>
              Back to Log In
            </button>
          </div>
        </div>
        {/* Panel for login mode (encourages sign-up) */}
        <div className="panel panel-right">
          <div className="content">
            <h3>Don't have an account?</h3>
            <p>Start your journey with one click.</p>
            <button className="btn transparent" onClick={() => setSignUpMode(true)}>
            Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>);
};
exports.default = AuthSlider;
