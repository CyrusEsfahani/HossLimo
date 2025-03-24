"use strict";
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
exports.useAuth = exports.AuthProvider = void 0;
const react_1 = require("react");
const firebase_1 = require("../services/firebase"); // Adjust the path to your firebase.ts file
const auth_1 = require("firebase/auth");
// Create the context with a default value
const AuthContext = (0, react_1.createContext)(undefined);
// AuthProvider component to wrap the app
const AuthProvider = ({ children }) => {
    const [user, setUser] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const unsubscribe = (0, auth_1.onAuthStateChanged)(firebase_1.auth, (authUser) => {
            console.log('Auth state changed, user:', authUser); // Debug
            setUser(authUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, auth_1.signInWithEmailAndPassword)(firebase_1.auth, email, password);
    });
    const signup = (email, password, name) => __awaiter(void 0, void 0, void 0, function* () {
        const userCredential = yield (0, auth_1.createUserWithEmailAndPassword)(firebase_1.auth, email, password);
        if (userCredential.user) {
            yield (0, auth_1.updateProfile)(userCredential.user, { displayName: name });
        }
    });
    const logout = () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, auth_1.signOut)(firebase_1.auth);
    });
    const value = {
        user,
        loading,
        login,
        signup,
        logout,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
exports.AuthProvider = AuthProvider;
// Hook to use the auth context
const useAuth = () => {
    const context = (0, react_1.useContext)(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
exports.useAuth = useAuth;
