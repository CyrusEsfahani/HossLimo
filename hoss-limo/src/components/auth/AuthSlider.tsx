// src/components/auth/AuthSlider.tsx
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
  // If initialView is 'signup', start in sign-up mode
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

  // Signup form with Formik
  const formikSignup = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
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
      <button className="close-btn" onClick={onClose}>&times;</button>

      {/* Forms Container */}
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign In Form */}
          <form onSubmit={formikLogin.handleSubmit} className="sign-in-form">
            <h2>Log In</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
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
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
            <p className="social-text">Or sign in with Google</p>
            <div className="social-media">
              <button type="button" className="social-icon" onClick={handleGoogleSignIn} disabled={isLoading}>
                <i className="fab fa-google"></i>
              </button>
            </div>
            {errorMessage && <div className="error-message" style={{ marginTop: '10px' }}>{errorMessage}</div>}
          </form>

          {/* Sign Up Form */}
          <form onSubmit={formikSignup.handleSubmit} className="sign-up-form">
            <h2>Sign Up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Full Name"
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
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={formikSignup.handleChange}
                onBlur={formikSignup.handleBlur}
                value={formikSignup.values.confirmPassword}
              />
            </div>
            {formikSignup.touched.confirmPassword && formikSignup.errors.confirmPassword && (
              <div className="error-message">{formikSignup.errors.confirmPassword}</div>
            )}
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Sign Up'}
            </button>
            <p className="social-text">Or sign up with Google</p>
            <div className="social-media">
              <button type="button" className="social-icon" onClick={handleGoogleSignIn} disabled={isLoading}>
                <i className="fab fa-google"></i>
              </button>
            </div>
            {errorMessage && <div className="error-message" style={{ marginTop: '10px' }}>{errorMessage}</div>}
          </form>
        </div>
      </div>

      {/* Panels Container */}
      <div className="panels-container">
        {/* Left Panel CTA */}
        <div className="content">
          {signUpMode ? (
            <>
              <h3>Already have an account?</h3>
              <p>Log in to continue your experience with Hoss Limo!</p>
              <button className="btn transparent" onClick={() => setSignUpMode(false)}>Log In</button>
            </>
          ) : (
            <>
              <h3>New here?</h3>
              <p>Don't have an account? Sign up to discover great experiences!</p>
              <button className="btn transparent" onClick={() => setSignUpMode(true)}>Sign Up</button>
            </>
          )}
        </div>
        {/* Optionally, you can include images in the panels:
        <img src="path_to_some_image.svg" className="image" alt="panel image" /> */}
      </div>
    </div>
  );
};

export default AuthSlider;

