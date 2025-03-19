import { 
  collection, 
  addDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  Timestamp,
  doc
} from 'firebase/firestore';
import { db } from './firebase';
import { Reservation, Service } from '../types/reservations.types';
import { FirebaseError } from '@firebase/app';

// Constants for collection names
const RESERVATIONS_COLLECTION = 'reservations';
const SERVICES_COLLECTION = 'services';

// Interface for Firestore document data (to handle Timestamp conversion)
interface ReservationFirestoreData {
  userId: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  vehicleType: string;
  passengers: number;
  specialRequests: string;
  status: string;
  createdAt: Timestamp;
}

// Create a new reservation
export const createReservation = async (reservationData: Omit<Reservation, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, RESERVATIONS_COLLECTION), {
      ...reservationData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error('Firestore error creating reservation:', {
        code: error.code,
        message: error.message,
      });
      throw new Error(`Failed to create reservation: ${error.message} (Code: ${error.code})`);
    }
    console.error('Unknown error creating reservation:', error);
    throw new Error('Failed to create reservation due to an unexpected error.');
  }
};

// Get reservations by user ID
export const getUserReservations = async (userId: string): Promise<Reservation[]> => {
  try {
    const q = query(
      collection(db, RESERVATIONS_COLLECTION),
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    const reservations: Reservation[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as ReservationFirestoreData;
      reservations.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
      } as Reservation);
    });

    // Sort reservations by createdAt in descending order (newest first)
    reservations.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return reservations;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error('Firestore error fetching user reservations:', {
        code: error.code,
        message: error.message,
      });
      throw new Error(`Failed to fetch user reservations: ${error.message} (Code: ${error.code})`);
    }
    console.error('Unknown error fetching user reservations:', error);
    throw new Error('Failed to fetch user reservations due to an unexpected error.');
  }
};

// Get a reservation by ID
export const getReservationById = async (id: string): Promise<Reservation | null> => {
  try {
    const docRef = doc(db, RESERVATIONS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as ReservationFirestoreData;
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt.toDate(),
      } as Reservation;
    }

    return null;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error('Firestore error fetching reservation by ID:', {
        code: error.code,
        message: error.message,
      });
      throw new Error(`Failed to fetch reservation by ID: ${error.message} (Code: ${error.code})`);
    }
    console.error('Unknown error fetching reservation by ID:', error);
    throw new Error('Failed to fetch reservation by ID due to an unexpected error.');
  }
};

// Get all services
export const getServices = async (): Promise<Service[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, SERVICES_COLLECTION));
    const services: Service[] = [];

    querySnapshot.forEach((doc) => {
      services.push({
        id: doc.id,
        ...doc.data(),
      } as Service);
    });

    return services;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error('Firestore error fetching services:', {
        code: error.code,
        message: error.message,
      });
      throw new Error(`Failed to fetch services: ${error.message} (Code: ${error.code})`);
    }
    console.error('Unknown error fetching services:', error);
    throw new Error('Failed to fetch services due to an unexpected error.');
  }
};