import { useState, useEffect } from 'react';
import { auth } from '../services/firebase'; // Adjust the path to your firebase.ts file
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update user profile with name using updateProfile function
    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName: name });
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return { user, login, signup, logout, loading };
};

export default useAuth;