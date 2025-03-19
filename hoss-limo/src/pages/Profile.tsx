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

  if (loading) {
    return <div className="container-custom py-12 pt-20 text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="container-custom py-12 pt-20 text-center text-red-600">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container-custom py-12 pt-20" // Added pt-20 to avoid nav overlap
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Your Reservations</h1>
      {reservations.length === 0 ? (
        <p className="text-center text-gray-700">You have no reservations yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reservations.map((reservation, index) => (
            <motion.div
              key={reservation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <p><strong>Date:</strong> {reservation.pickupDate}</p>
              <p><strong>Time:</strong> {reservation.pickupTime}</p>
              <p><strong>Pickup Location:</strong> {reservation.pickupLocation}</p>
              <p><strong>Dropoff Location:</strong> {reservation.dropoffLocation}</p>
              <p><strong>Vehicle Type:</strong> {reservation.vehicleType}</p>
              <p><strong>Passengers:</strong> {reservation.passengers}</p>
              <p><strong>Status:</strong> {reservation.status}</p>
              {reservation.specialRequests && (
                <p><strong>Special Requests:</strong> {reservation.specialRequests}</p>
              )}
              <p><strong>Created At:</strong> {new Date(reservation.createdAt).toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-auto">Reservation ID: {reservation.id}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Profile;