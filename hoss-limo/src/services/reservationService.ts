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
  
  const RESERVATIONS_COLLECTION = 'reservations';
  const SERVICES_COLLECTION = 'services';
  
  // Create a new reservation
  export const createReservation = async (reservationData: Omit<Reservation, 'id' | 'createdAt'>) => {
    try {
      const docRef = await addDoc(collection(db, RESERVATIONS_COLLECTION), {
        ...reservationData,
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      throw error;
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
        const data = doc.data();
        reservations.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
        } as Reservation);
      });
      
      return reservations;
    } catch (error) {
      throw error;
    }
  };
  
  // Get a reservation by ID
  export const getReservationById = async (id: string): Promise<Reservation | null> => {
    try {
      const docRef = doc(db, RESERVATIONS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt.toDate(),
        } as Reservation;
      }
      
      return null;
    } catch (error) {
      throw error;
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
          ...doc.data()
        } as Service);
      });
      
      return services;
    } catch (error) {
      throw error;
    }
  };