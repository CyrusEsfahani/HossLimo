import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import { createReservation } from '../../services/reservationService';

const vehicleTypes = [
  { id: 'sedan', name: 'Luxury Sedan', capacity: 3 },
  { id: 'suv', name: 'Executive SUV', capacity: 6 },
  { id: 'limo', name: 'Stretch Limousine', capacity: 8 },
  { id: 'van', name: 'Luxury Van', capacity: 12 },
];

interface BookingFormProps {
  onSuccess: (reservationId: string) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSuccess }) => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const formik = useFormik({
    initialValues: {
      pickupLocation: '',
      dropoffLocation: '',
      pickupDate: getTomorrowDate(),
      pickupTime: '10:00',
      vehicleType: 'sedan',
      passengers: 1,
      specialRequests: '',
    },
    validationSchema: Yup.object({
      pickupLocation: Yup.string().required('Pickup location is required'),
      dropoffLocation: Yup.string().required('Drop-off location is required'),
      pickupDate: Yup.date().required('Pickup date is required').min(new Date(), 'Date must be in the future'),
      pickupTime: Yup.string().required('Pickup time is required'),
      vehicleType: Yup.string().required('Vehicle type is required'),
      passengers: Yup.number()
        .required('Number of passengers is required')
        .positive('Number of passengers must be positive')
        .integer('Number of passengers must be a whole number')
        .max(12, 'Maximum 12 passengers allowed'),
    }),
    onSubmit: async (values) => {
      if (!currentUser) {
        setErrorMessage('You must be logged in to book a ride');
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);

      try {
        const reservationData = {
          userId: currentUser.uid,
          pickupLocation: values.pickupLocation,
          dropoffLocation: values.dropoffLocation,
          pickupDate: values.pickupDate,
          pickupTime: values.pickupTime,
          vehicleType: values.vehicleType,
          passengers: values.passengers,
          specialRequests: values.specialRequests,
          status: 'pending' as const,
        };

        const reservationId = await createReservation(reservationData);
        onSuccess(reservationId);
      } catch (error) {
        console.error('Error creating reservation:', error);
        setErrorMessage('Failed to create reservation. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const selectedVehicle = vehicleTypes.find(v => v.id === formik.values.vehicleType);

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-serif font-semibold mb-6">Book Your Luxury Ride</h2>

      {errorMessage && (
        <div className="mb-6 p-3 bg-red-100 text-red-800 rounded-md">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pickup Location */}
        <div>
          <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Location*
          </label>
          <input
            id="pickupLocation"
            name="pickupLocation"
            type="text"
            placeholder="Enter address"
            className={`w-full px-3 py-2 border rounded-md ${
              formik.touched.pickupLocation && formik.errors.pickupLocation
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pickupLocation}
          />
          {formik.touched.pickupLocation && formik.errors.pickupLocation && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.pickupLocation}</p>
          )}
        </div>

        {/* Dropoff Location */}
        <div>
          <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 mb-1">
            Drop-off Location*
          </label>
          <input
            id="dropoffLocation"
            name="dropoffLocation"
            type="text"
            placeholder="Enter address"
            className={`w-full px-3 py-2 border rounded-md ${
              formik.touched.dropoffLocation && formik.errors.dropoffLocation
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dropoffLocation}
          />
          {formik.touched.dropoffLocation && formik.errors.dropoffLocation && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.dropoffLocation}</p>
          )}
        </div>

        {/* Pickup Date */}
        <div>
          <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Date*
          </label>
          <input
            id="pickupDate"
            name="pickupDate"
            type="date"
            className={`w-full px-3 py-2 border rounded-md ${
              formik.touched.pickupDate && formik.errors.pickupDate
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pickupDate}
            min={getTomorrowDate()}
          />
          {formik.touched.pickupDate && formik.errors.pickupDate && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.pickupDate}</p>
          )}
        </div>

        {/* Pickup Time */}
        <div>
          <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Time*
          </label>
          <input
            id="pickupTime"
            name="pickupTime"
            type="time"
            className={`w-full px-3 py-2 border rounded-md ${
              formik.touched.pickupTime && formik.errors.pickupTime
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pickupTime}
          />
          {formik.touched.pickupTime && formik.errors.pickupTime && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.pickupTime}</p>
          )}
        </div>

        {/* Vehicle Type */}
        <div>
          <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Type*
          </label>
          <select
            id="vehicleType"
            name="vehicleType"
            className={`w-full px-3 py-2 border rounded-md ${
              formik.touched.vehicleType && formik.errors.vehicleType
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.vehicleType}
          >
            {vehicleTypes.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name} (up to {vehicle.capacity} passengers)
              </option>
            ))}
          </select>
          {formik.touched.vehicleType && formik.errors.vehicleType && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.vehicleType}</p>
          )}
        </div>

        {/* Number of Passengers */}
        <div>
          <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Passengers*
          </label>
          <input
            id="passengers"
            name="passengers"
            type="number"
            min="1"
            max={selectedVehicle?.capacity || 12}
            className={`w-full px-3 py-2 border rounded-md ${
              formik.touched.passengers && formik.errors.passengers
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passengers}
          />
          {formik.touched.passengers && formik.errors.passengers && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.passengers}</p>
          )}
          {selectedVehicle && formik.values.passengers > selectedVehicle.capacity && (
            <p className="mt-1 text-sm text-orange-500">
              This vehicle only accommodates up to {selectedVehicle.capacity} passengers. Please select a larger vehicle or reduce the number of passengers.
            </p>
          )}
        </div>
      </div>

      {/* Special Requests */}
      <div className="mt-6">
        <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
          Special Requests (Optional)
        </label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          rows={4}
          placeholder="Any special requirements or requests?"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.specialRequests}
        />
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn btn-primary flex justify-center items-center"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : null}
          Complete Reservation
        </button>
      </div>
    </form>
  );
};

export default BookingForm;