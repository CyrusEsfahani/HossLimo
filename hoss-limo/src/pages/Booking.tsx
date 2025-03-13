import React, { useState } from 'react';
import BookingForm from '../components/booking/BookingForm';

const Booking: React.FC = () => {
  const [reservationId, setReservationId] = useState<string | null>(null);

  const handleSuccess = (id: string) => {
    setReservationId(id);
  };

  return (
    <div className="container-custom py-12">
      {reservationId ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Reservation Confirmed!</h1>
          <p className="text-lg text-gray-700">
            Your reservation ID is: <strong>{reservationId}</strong>
          </p>
        </div>
      ) : (
        <BookingForm onSuccess={handleSuccess} />
      )}
    </div>
  );
};

export default Booking;
