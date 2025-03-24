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
const react_1 = __importStar(require("react"));
const firebase_1 = require("../services/firebase");
const firestore_1 = require("firebase/firestore");
const framer_motion_1 = require("framer-motion");
const react_router_dom_1 = require("react-router-dom");
const Profile = ({ user }) => {
    const [reservations, setReservations] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchReservations = () => __awaiter(void 0, void 0, void 0, function* () {
            if (!user) {
                setError('User not authenticated');
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                setError(null);
                const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'reservations'), (0, firestore_1.where)('userId', '==', user.uid));
                const querySnapshot = yield (0, firestore_1.getDocs)(q);
                const reservationsData = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return Object.assign(Object.assign({ id: doc.id }, data), { createdAt: data.createdAt.toDate() });
                });
                setReservations(reservationsData);
            }
            catch (err) {
                console.error('Error fetching reservations:', err);
                setError('Failed to fetch reservations');
            }
            finally {
                setLoading(false);
            }
        });
        fetchReservations();
    }, [user]);
    if (!user) {
        return <react_router_dom_1.Navigate to="/"/>;
    }
    if (loading) {
        return <div className="container-custom py-12 pt-20 text-center text-gray-700">Loading...</div>;
    }
    if (error) {
        return <div className="container-custom py-12 pt-20 text-center text-red-600">{error}</div>;
    }
    return (<framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="container-custom py-12 pt-20" // Added pt-20 to avoid nav overlap
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Your Reservations</h1>
      {reservations.length === 0 ? (<p className="text-center text-gray-700">You have no reservations yet.</p>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reservations.map((reservation, index) => (<framer_motion_1.motion.div key={reservation.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <p><strong>Date:</strong> {reservation.pickupDate}</p>
              <p><strong>Time:</strong> {reservation.pickupTime}</p>
              <p><strong>Pickup Location:</strong> {reservation.pickupLocation}</p>
              <p><strong>Dropoff Location:</strong> {reservation.dropoffLocation}</p>
              <p><strong>Vehicle Type:</strong> {reservation.vehicleType}</p>
              <p><strong>Passengers:</strong> {reservation.passengers}</p>
              <p><strong>Status:</strong> {reservation.status}</p>
              {reservation.specialRequests && (<p><strong>Special Requests:</strong> {reservation.specialRequests}</p>)}
              <p><strong>Created At:</strong> {new Date(reservation.createdAt).toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-auto">Reservation ID: {reservation.id}</p>
            </framer_motion_1.motion.div>))}
        </div>)}
    </framer_motion_1.motion.div>);
};
exports.default = Profile;
