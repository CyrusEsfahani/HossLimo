export interface Reservation {
    id?: string;
    userId: string;
    pickupLocation: string;
    dropoffLocation: string;
    pickupDate: string;
    pickupTime: string;
    vehicleType: string;
    passengers: number;
    specialRequests?: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: Date;
  }
  
  export type ServiceType = 'Airport Transfer' | 'Corporate Travel' | 'Special Events' | 'Point to Point' | 'Hourly Charter';
  
  export interface Service {
    id: string;
    title: ServiceType;
    description: string;
    imageUrl: string;
    price: string;
  }