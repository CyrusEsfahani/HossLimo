import { useState, useEffect } from 'react';
import { db } from '../services/firebase'; // Adjust path based on your Firebase setup
import { collection, getDocs } from 'firebase/firestore';

interface Reservation {
  id: string;
  pickUpLocation: string;
  dropOffLocation: string;
  vehicleType: string;
  date: string;
  time: string;
  passengers: number;
  luggage: number;
  totalCost: number;
}

export const useReservation = () => {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'reservations'));
        const reservationData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Reservation));
        // Set the first reservation (adjust logic for multiple reservations if needed)
        setReservation(reservationData[0] || null);
      } catch (err) {
        setError('Failed to fetch reservation data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, []);

  return { reservation, loading, error };
};