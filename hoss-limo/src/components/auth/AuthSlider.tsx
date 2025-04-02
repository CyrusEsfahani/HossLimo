import React, { useState } from 'react';
import './AuthSlider.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';

interface AuthSliderProps {
  onClose: () => void;
  initialView?: 'login' | 'signup';
}

const AuthSlider: React.FC<AuthSliderProps> = ({ onClose, initialView = 'login' }) => {
  const [signUpMode, setSignUpMode] = useState(initialView === 'signup');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const provider = new GoogleAuthProvider();

  // Google sign-in handler
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await signInWithPopup(auth, provider);
      onClose();
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to sign in with Google.');
    } finally {
      setIsLoading(false);
    }
  };

  // Login form with Formik
  const formikLogin = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        await login(values.email, values.password);
        onClose();
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Signup form with Formik (adjusted to match referenced design: single "Name" field)
  const formikSignup = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        await signup(values.email, values.password, values.name);
        onClose();
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className={`container ${signUpMode ? 'sign-up-mode' : ''}`}>
      {/* Close button */}
      <button className="close-btn" onClick={onClose}>×</button>

      {/* Forms Container */}
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign In Form */}
          <form onSubmit={formikLogin.handleSubmit} className="sign-in-form">
            <h2>Welcome back!</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email address"
                name="email"
                onChange={formikLogin.handleChange}
                onBlur={formikLogin.handleBlur}
                value={formikLogin.values.email}
              />
            </div>
            {formikLogin.touched.email && formikLogin.errors.email && (
              <div className="error-message">{formikLogin.errors.email}</div>
            )}
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={formikLogin.handleChange}
                onBlur={formikLogin.handleBlur}
                value={formikLogin.values.password}
              />
            </div>
            {formikLogin.touched.password && formikLogin.errors.password && (
              <div className="error-message">{formikLogin.errors.password}</div>
            )}
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'SIGN IN'}
            </button>
            <p className="social-text">or sign in with</p>
            <div className="social-media">
              <button type="button" className="social-btn" onClick={handleGoogleSignIn} disabled={isLoading}>
                <i className="fab fa-google"></i> Google
              </button>
            </div>
            {errorMessage && <div className="error-message" style={{ marginTop: '10px' }}>{errorMessage}</div>}
          </form>

          {/* Sign Up Form */}
          <form onSubmit={formikSignup.handleSubmit} className="sign-up-form">
            <h2>Create An Account</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={formikSignup.handleChange}
                onBlur={formikSignup.handleBlur}
                value={formikSignup.values.name}
              />
            </div>
            {formikSignup.touched.name && formikSignup.errors.name && (
              <div className="error-message">{formikSignup.errors.name}</div>
            )}
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={formikSignup.handleChange}
                onBlur={formikSignup.handleBlur}
                value={formikSignup.values.email}
              />
            </div>
            {formikSignup.touched.email && formikSignup.errors.email && (
              <div className="error-message">{formikSignup.errors.email}</div>
            )}
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={formikSignup.handleChange}
                onBlur={formikSignup.handleBlur}
                value={formikSignup.values.password}
              />
            </div>
            {formikSignup.touched.password && formikSignup.errors.password && (
              <div className="error-message">{formikSignup.errors.password}</div>
            )}
            <div className="checkbox-container">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the Terms & Conditions</label>
            </div>
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'SIGN UP'}
            </button>
            <p className="social-text">or register with</p>
            <div className="social-media">
              <button type="button" className="social-btn" onClick={handleGoogleSignIn} disabled={isLoading}>
                <i className="fab fa-google"></i> Google
              </button>
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
            <h3>Already have an account?</h3>
            <p>Sign in with your email & password</p>
            <button className="btn transparent" onClick={() => setSignUpMode(false)}>
              SIGN IN
            </button>
          </div>
        </div>
        {/* Panel for login mode (encourages sign-up) */}
        <div className="panel panel-right">
          <div className="content">
            <h3>Don't have an account?</h3>
            <p>Start your journey in one click</p>
            <button className="btn transparent" onClick={() => setSignUpMode(true)}>
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSlider;