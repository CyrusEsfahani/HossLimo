import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { User } from 'firebase/auth';

interface Reservation {
  id: string;
  userId: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  vehicleType: string;
  passengers: number;
  specialRequests: string;
  status: string;
  createdAt: Date;
}

interface ProfileProps {
  user: User | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const q = query(collection(db, 'reservations'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const reservationsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt.toDate(),
          } as Reservation;
        });
        setReservations(reservationsData);
      } catch (err) {
        console.error('Error fetching reservations:', err);
        setError('Failed to fetch reservations');
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [user]);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container-custom pt-32 pb-20 px-4 sm:px-6 lg:px-8"
      >
        {/* Title Section */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl font-extrabold text-center mb-12 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600"
        >
          Your Reservations
        </motion.h1>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-gray-400 text-lg">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="inline-block w-8 h-8 border-4 border-t-transparent border-yellow-400 rounded-full"
            />
            <p className="mt-4">Loading your reservations...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-400 text-lg">
            <p>{error}</p>
          </div>
        )}

        {/* Reservations Grid */}
        {!loading && !error && (
          <>
            {reservations.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center text-gray-400 text-lg"
              >
                You have no reservations yet. Book a luxury ride today!
              </motion.p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {reservations.map((reservation, index) => (
                  <motion.div
                    key={reservation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-700/50 hover:shadow-2xl transition-all duration-300 flex flex-col"
                  >
                    {/* Status Badge */}
                    <span
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                        reservation.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-green-500/20 text-green-300'
                      }`}
                    >
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </span>

                    {/* Reservation Details */}
                    <div className="space-y-3 text-gray-200">
                      <p>
                        <strong className="text-yellow-400">Date: </strong>
                        {reservation.pickupDate}
                      </p>
                      <p>
                        <strong className="text-yellow-400">Time: </strong>
                        {reservation.pickupTime}
                      </p>
                      <p>
                        <strong className="text-yellow-400">Pickup: </strong>
                        {reservation.pickupLocation}
                      </p>
                      <p>
                        <strong className="text-yellow-400">Dropoff: </strong>
                        {reservation.dropoffLocation}
                      </p>
                      <p>
                        <strong className="text-yellow-400">Vehicle: </strong>
                        {reservation.vehicleType}
                      </p>
                      <p>
                        <strong className="text-yellow-400">Passengers: </strong>
                        {reservation.passengers}
                      </p>
                      {reservation.specialRequests && (
                        <p>
                          <strong className="text-yellow-400">Special Requests: </strong>
                          {reservation.specialRequests}
                        </p>
                      )}
                      <p>
                        <strong className="text-yellow-400">Created: </strong>
                        {new Date(reservation.createdAt).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-400 mt-4">
                        <strong className="text-yellow-400">Reservation ID: </strong>
                        {reservation.id}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;