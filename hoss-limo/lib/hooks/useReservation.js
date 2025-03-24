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
exports.useReservation = void 0;
const react_1 = require("react");
const firebase_1 = require("../services/firebase"); // Adjust path based on your Firebase setup
const firestore_1 = require("firebase/firestore");
const useReservation = () => {
    const [reservation, setReservation] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchReservation = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, 'reservations'));
                const reservationData = querySnapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
                // Set the first reservation (adjust logic for multiple reservations if needed)
                setReservation(reservationData[0] || null);
            }
            catch (err) {
                setError('Failed to fetch reservation data');
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        });
        fetchReservation();
    }, []);
    return { reservation, loading, error };
};
exports.useReservation = useReservation;
