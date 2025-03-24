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
exports.getServices = exports.getReservationById = exports.getUserReservations = exports.createReservation = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("./firebase");
const app_1 = require("@firebase/app");
// Constants for collection names
const RESERVATIONS_COLLECTION = 'reservations';
const SERVICES_COLLECTION = 'services';
// Create a new reservation
const createReservation = (reservationData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = yield (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_1.db, RESERVATIONS_COLLECTION), Object.assign(Object.assign({}, reservationData), { createdAt: firestore_1.Timestamp.now() }));
        return docRef.id;
    }
    catch (error) {
        if (error instanceof app_1.FirebaseError) {
            console.error('Firestore error creating reservation:', {
                code: error.code,
                message: error.message,
            });
            throw new Error(`Failed to create reservation: ${error.message} (Code: ${error.code})`);
        }
        console.error('Unknown error creating reservation:', error);
        throw new Error('Failed to create reservation due to an unexpected error.');
    }
});
exports.createReservation = createReservation;
// Get reservations by user ID
const getUserReservations = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, RESERVATIONS_COLLECTION), (0, firestore_1.where)('userId', '==', userId));
        const querySnapshot = yield (0, firestore_1.getDocs)(q);
        const reservations = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            reservations.push(Object.assign(Object.assign({ id: doc.id }, data), { createdAt: data.createdAt.toDate() }));
        });
        // Sort reservations by createdAt in descending order (newest first)
        reservations.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        return reservations;
    }
    catch (error) {
        if (error instanceof app_1.FirebaseError) {
            console.error('Firestore error fetching user reservations:', {
                code: error.code,
                message: error.message,
            });
            throw new Error(`Failed to fetch user reservations: ${error.message} (Code: ${error.code})`);
        }
        console.error('Unknown error fetching user reservations:', error);
        throw new Error('Failed to fetch user reservations due to an unexpected error.');
    }
});
exports.getUserReservations = getUserReservations;
// Get a reservation by ID
const getReservationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = (0, firestore_1.doc)(firebase_1.db, RESERVATIONS_COLLECTION, id);
        const docSnap = yield (0, firestore_1.getDoc)(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return Object.assign(Object.assign({ id: docSnap.id }, data), { createdAt: data.createdAt.toDate() });
        }
        return null;
    }
    catch (error) {
        if (error instanceof app_1.FirebaseError) {
            console.error('Firestore error fetching reservation by ID:', {
                code: error.code,
                message: error.message,
            });
            throw new Error(`Failed to fetch reservation by ID: ${error.message} (Code: ${error.code})`);
        }
        console.error('Unknown error fetching reservation by ID:', error);
        throw new Error('Failed to fetch reservation by ID due to an unexpected error.');
    }
});
exports.getReservationById = getReservationById;
// Get all services
const getServices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, SERVICES_COLLECTION));
        const services = [];
        querySnapshot.forEach((doc) => {
            services.push(Object.assign({ id: doc.id }, doc.data()));
        });
        return services;
    }
    catch (error) {
        if (error instanceof app_1.FirebaseError) {
            console.error('Firestore error fetching services:', {
                code: error.code,
                message: error.message,
            });
            throw new Error(`Failed to fetch services: ${error.message} (Code: ${error.code})`);
        }
        console.error('Unknown error fetching services:', error);
        throw new Error('Failed to fetch services due to an unexpected error.');
    }
});
exports.getServices = getServices;
