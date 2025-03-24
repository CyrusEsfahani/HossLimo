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
exports.AuthProvider = exports.AuthContext = void 0;
const react_1 = __importStar(require("react"));
const auth_1 = require("firebase/auth");
const firebase_1 = require("../services/firebase");
// Create context
exports.AuthContext = (0, react_1.createContext)(null);
const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const unsubscribe = (0, auth_1.onAuthStateChanged)(firebase_1.auth, (user) => {
            if (user) {
                setCurrentUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                });
            }
            else {
                setCurrentUser(null);
            }
            setIsLoading(false);
        });
        return unsubscribe;
    }, []);
    // Sign up function
    const signup = (email, password, name) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userCredential = yield (0, auth_1.createUserWithEmailAndPassword)(firebase_1.auth, email, password);
            if (userCredential.user) {
                yield (0, auth_1.updateProfile)(userCredential.user, {
                    displayName: name
                });
            }
        }
        catch (error) {
            throw error;
        }
    });
    // Login function
    const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, auth_1.signInWithEmailAndPassword)(firebase_1.auth, email, password);
        }
        catch (error) {
            throw error;
        }
    });
    // Logout function
    const logout = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, auth_1.signOut)(firebase_1.auth);
        }
        catch (error) {
            throw error;
        }
    });
    const value = {
        currentUser,
        isLoading,
        signup,
        login,
        logout
    };
    return (<exports.AuthContext.Provider value={value}>
      {!isLoading && children}
    </exports.AuthContext.Provider>);
};
exports.AuthProvider = AuthProvider;
