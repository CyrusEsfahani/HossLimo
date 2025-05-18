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
    vehicleType: '2023 Suburban',
    passengers: 1,
    specialRequests: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
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

      setSuccess(true);
      setFormData({
        pickupLocation: '',
        dropoffLocation: '',
        pickupDate: '',
        pickupTime: '',
        vehicleType: '2023 Suburban',
        passengers: 1,
        specialRequests: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('Failed to create booking.');
    } finally {
      setLoading(false);
    }
  };

  // Generate time slots in 15-minute intervals
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const time = `${formattedHour}:${formattedMinute}`;
        const displayHour = hour % 12 || 12;
        const amPm = hour < 12 ? 'AM' : 'PM';
        const displayTime = `${displayHour}:${formattedMinute} ${amPm}`;
        options.push(
          <option key={time} value={time}>
            {displayTime}
          </option>
        );
      }
    }
    return options;
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>
            1
          </div>
          <div className={`h-1 w-16 ${step >= 2 ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
          <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 2 ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>
            2
          </div>
          <div className={`h-1 w-16 ${step >= 3 ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
          <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 3 ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>
            3
          </div>
        </div>
      </div>
    );
  };

  const renderStep1 = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Pickup & Drop-off Details</h2>
            
            <div className="grid grid-cols-1 gap-6">
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
                  placeholder="Enter full address"
                  className="
                    w-full 
                    px-4 
                    py-3 
                    border 
                    border-gray-300 
                    rounded-lg 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-yellow-500 
                    transition 
                    duration-300
                    bg-white
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
                  placeholder="Enter full address"
                  className="
                    w-full 
                    px-4 
                    py-3 
                    border 
                    border-gray-300 
                    rounded-lg 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-yellow-500 
                    transition 
                    duration-300
                    bg-white
                  "
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={nextStep}
            className="
              px-8
              py-3 
              bg-yellow-500
              text-white 
              rounded-lg 
              font-bold 
              text-lg 
              shadow-lg 
              hover:bg-yellow-600
              focus:outline-none 
              transition 
              duration-300 
              transform 
              hover:-translate-y-1
            "
          >
            Continue
          </button>
        </div>
      </>
    );
  };

  const renderStep2 = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Date & Time</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    focus:ring-yellow-500
                    transition 
                    duration-300
                    bg-white
                  "
                  required
                />
              </div>

              {/* Pickup Time */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Pickup Time*
                </label>
                <select
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
                    focus:ring-yellow-500
                    transition 
                    duration-300
                    bg-white
                  "
                  required
                >
                  <option value="">Select a time</option>
                  {generateTimeOptions()}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="
              px-6
              py-3 
              bg-gray-300
              text-gray-700 
              rounded-lg 
              font-semibold 
              text-lg 
              shadow-md 
              hover:bg-gray-400
              focus:outline-none 
              transition 
              duration-300
            "
          >
            Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="
              px-8
              py-3 
              bg-yellow-500
              text-white 
              rounded-lg 
              font-bold 
              text-lg 
              shadow-lg 
              hover:bg-yellow-600
              focus:outline-none 
              transition 
              duration-300 
              transform 
              hover:-translate-y-1
            "
          >
            Continue
          </button>
        </div>
      </>
    );
  };

  const renderStep3 = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Vehicle & Passengers</h2>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Vehicle Type */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Select Your Vehicle*
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className={`
                      border rounded-xl p-4 cursor-pointer transition duration-300
                      ${formData.vehicleType === '2023 Suburban' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300 hover:border-yellow-300'}
                    `}
                    onClick={() => setFormData({...formData, vehicleType: '2023 Suburban'})}
                  >
                    <div className="h-40 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-500">2023 Suburban Image</span>
                    </div>
                    <h3 className="font-bold text-lg">2023 Suburban</h3>
                    <p className="text-gray-600 text-sm mt-1">Premium luxury SUV with spacious interior and modern amenities</p>
                    <div className="mt-2 text-sm flex items-center gap-2">
                      <span className="bg-gray-100 px-2 py-1 rounded">Up to 7 passengers</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">Wi-Fi</span>
                    </div>
                  </div>
                  
                  <div 
                    className={`
                      border rounded-xl p-4 cursor-pointer transition duration-300
                      ${formData.vehicleType === '2021 Suburban LT' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300 hover:border-yellow-300'}
                    `}
                    onClick={() => setFormData({...formData, vehicleType: '2021 Suburban LT'})}
                  >
                    <div className="h-40 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-500">2021 Suburban LT Image</span>
                    </div>
                    <h3 className="font-bold text-lg">2021 Suburban LT</h3>
                    <p className="text-gray-600 text-sm mt-1">Comfortable and elegant SUV with leather interior</p>
                    <div className="mt-2 text-sm flex items-center gap-2">
                      <span className="bg-gray-100 px-2 py-1 rounded">Up to 7 passengers</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">Leather seats</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Number of Passengers */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Number of Passengers*
                </label>
                <select
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
                    focus:ring-yellow-500
                    transition 
                    duration-300
                    bg-white
                  "
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'passenger' : 'passengers'}</option>
                  ))}
                </select>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Special Requests
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Child seat, specific music preferences, temperature preferences, etc."
                  className="
                    w-full 
                    px-4 
                    py-3 
                    border 
                    border-gray-300 
                    rounded-lg 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-yellow-500
                    transition 
                    duration-300
                    bg-white
                  "
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Booking Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Pickup Location:</span>
                <span className="font-medium">{formData.pickupLocation || 'Not specified'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Drop-off Location:</span>
                <span className="font-medium">{formData.dropoffLocation || 'Not specified'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time:</span>
                <span className="font-medium">
                  {formData.pickupDate ? new Date(formData.pickupDate).toLocaleDateString() : 'Not specified'} 
                  {formData.pickupTime ? ' at ' + 
                    (formData.pickupTime ? (() => {
                      const [hours, minutes] = formData.pickupTime.split(':');
                      const hour = parseInt(hours);
                      const ampm = hour >= 12 ? 'PM' : 'AM';
                      const displayHour = hour % 12 || 12;
                      return `${displayHour}:${minutes} ${ampm}`;
                    })() : '')
                  : ''}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vehicle:</span>
                <span className="font-medium">{formData.vehicleType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Passengers:</span>
                <span className="font-medium">{formData.passengers}</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mt-6">
            Booking created successfully! Your reservation has been saved.
          </div>
        )}
        
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="
              px-6
              py-3 
              bg-gray-300
              text-gray-700 
              rounded-lg 
              font-semibold 
              text-lg 
              shadow-md 
              hover:bg-gray-400
              focus:outline-none 
              transition 
              duration-300
            "
          >
            Back
          </button>
          <button
            type="submit"
            className="
              px-8
              py-3 
              bg-gradient-to-r 
              from-yellow-500 
              to-yellow-600 
              text-white 
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
        </div>
      </>
    );
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
        pb-16
      "
    >
      <div className="max-w-5xl mx-auto">
        <h1
          className="
            text-5xl 
            font-extrabold 
            mb-2
            text-center 
            text-gray-800
            transition-all 
            duration-500 
            ease-in-out
          "
        >
          Make a Reservation
        </h1>
        
        <p className="text-center text-gray-600 mb-10 text-xl">Experience luxury and comfort with our premium transportation service</p>

        {renderStepIndicator()}

        <form
          onSubmit={handleSubmit}
          className="
            bg-white 
            p-8 
            rounded-2xl 
            shadow-2xl 
            mx-auto
            animate-[fadeIn_0.5s_ease-in-out] 
            transition-opacity
          "
          style={{ animationFillMode: 'forwards' }}
        >
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </form>

        <div className="mt-10 text-center text-gray-500 text-sm">
          <p>Need assistance? Contact our reservation specialists at (123) 456-7890</p>
        </div>
      </div>
    </div>
  );
};

export default Booking;