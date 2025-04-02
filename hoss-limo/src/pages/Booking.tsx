import React, { useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';

const Booking: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    vehicleType: 'Luxury Sedan',
    passengers: 1,
    specialRequests: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to book.');
      return;
    }

    setLoading(true);
    try {
      const reservationData = {
        ...formData,
        userId: user.uid,
        status: 'pending',
        createdAt: new Date(),
      };
      await addDoc(collection(db, 'reservations'), reservationData);

      alert('Booking created successfully! Your reservation has been saved.');
      setFormData({
        pickupLocation: '',
        dropoffLocation: '',
        pickupDate: '',
        pickupTime: '',
        vehicleType: 'Luxury Sedan',
        passengers: 1,
        specialRequests: '',
      });
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('Failed to create booking.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className="
        min-h-screen 
        bg-gradient-to-b 
        from-white 
        to-gray-100 
        pt-28  /* Pushes below navbar */
        px-4   /* Mobile-friendly horizontal padding */
      "
    >
      <div className="max-w-4xl mx-auto">
        <h1
          className="
            text-5xl 
            font-extrabold 
            mb-8 
            text-center 
            text-gray-800
            transition-all 
            duration-500 
            ease-in-out
            hover:text-gray-600
          "
        >
          Make a Reservation
        </h1>

        <form
          onSubmit={handleSubmit}
          className="
            bg-white 
            p-8 
            rounded-2xl 
            shadow-2xl 
            max-w-2xl 
            mx-auto
            animate-[fadeIn_0.5s_ease-in-out] 
            transition-opacity
          "
          style={{ animationFillMode: 'forwards' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Pickup Location */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Pickup Location*
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                className="
                  w-full 
                  px-4 
                  py-3 
                  border 
                  border-gray-300 
                  rounded-lg 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  transition 
                  duration-300
                "
                required
              />
            </div>

            {/* Dropoff Location */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Drop-off Location*
              </label>
              <input
                type="text"
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleChange}
                className="
                  w-full 
                  px-4 
                  py-3 
                  border 
                  border-gray-300 
                  rounded-lg 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  transition 
                  duration-300
                "
                required
              />
            </div>

            {/* Pickup Date */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Pickup Date*
              </label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                className="
                  w-full 
                  px-4 
                  py-3 
                  border 
                  border-gray-300 
                  rounded-lg 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  transition 
                  duration-300
                "
                required
              />
            </div>

            {/* Pickup Time */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Pickup Time*
              </label>
              <input
                type="time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                className="
                  w-full 
                  px-4 
                  py-3 
                  border 
                  border-gray-300 
                  rounded-lg 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  transition 
                  duration-300
                "
                required
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Vehicle Type*
              </label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="
                  w-full 
                  px-4 
                  py-3 
                  border 
                  border-gray-300 
                  rounded-lg 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  transition 
                  duration-300
                "
              >
                <option value="Luxury Sedan">Luxury Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Limousine">Limousine</option>
              </select>
            </div>

            {/* Number of Passengers */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Number of Passengers*
              </label>
              <input
                type="number"
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                className="
                  w-full 
                  px-4 
                  py-3 
                  border 
                  border-gray-300 
                  rounded-lg 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  transition 
                  duration-300
                "
                min="1"
                required
              />
            </div>
          </div>

          {/* Special Requests (full width) */}
          <div className="mt-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Special Requests
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              className="
                w-full 
                px-4 
                py-3 
                border 
                border-gray-300 
                rounded-lg 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500 
                transition 
                duration-300
              "
              rows={3}
            />
          </div>

          {error && <p className="text-red-600 mt-4 font-semibold">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="
              w-full 
              mt-6 
              bg-gradient-to-r 
              from-yellow-500 
              to-yellow-600 
              text-white 
              py-3 
              rounded-lg 
              font-bold 
              text-lg 
              shadow-lg 
              hover:shadow-xl 
              focus:outline-none 
              transition 
              duration-300 
              transform 
              hover:-translate-y-1
              disabled:bg-gray-400 
              disabled:cursor-not-allowed
            "
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Complete Reservation'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;

