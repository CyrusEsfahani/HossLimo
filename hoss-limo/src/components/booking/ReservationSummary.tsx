import React from 'react';
import { useReservation } from '../../hooks/useReservation'; // Hook we'll implement next

const ReservationSummary: React.FC = () => {
  const { reservation, loading, error } = useReservation();

  if (loading) {
    return <div className="text-center py-12">Loading reservation...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  if (!reservation) {
    return <div className="text-center py-12">No reservation details available.</div>;
  }

  return (
    <div className="container-custom section">
      <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">Reservation Summary</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p><strong>Pickup Location:</strong> {reservation.pickUpLocation}</p>
        <p><strong>Drop-off Location:</strong> {reservation.dropOffLocation}</p>
        <p><strong>Vehicle Type:</strong> {reservation.vehicleType}</p>
        <p><strong>Date:</strong> {reservation.date}</p>
        <p><strong>Time:</strong> {reservation.time}</p>
        <p><strong>Passengers:</strong> {reservation.passengers}</p>
        <p><strong>Luggage:</strong> {reservation.luggage}</p>
        <p><strong>Total Cost:</strong> ${reservation.totalCost}/hour</p>
        <button className="btn btn-primary mt-4">Confirm Booking</button>
      </div>
    </div>
  );
};

export default ReservationSummary;