import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Adjust path as needed
import AuthModal from '../components/auth/AuthModal'; // Import AuthModal from the auth folder

// Vehicle interface
interface Vehicle {
  id: string;
  name: string;
  year: string;
  image: string;
  interiorImages: string[];
  capacity: string;
  priceHour: number;
  amenities: string[];
  features: { [key: string]: boolean };
}

const OurFleet: React.FC = () => {
  const { user } = useAuth(); // Get authentication status
  const navigate = useNavigate(); // For programmatic navigation
  const [expandedVehicle, setExpandedVehicle] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // Control AuthModal visibility
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null); // Track selected vehicle

  // Fleet data
  const fleetData: Vehicle[] = [
    {
      id: 'suburban-lt-2021',
      name: 'Chevrolet Suburban LT',
      year: '2021',
      image: '/assets/images/suburban.png',
      interiorImages: [
        '/assets/images/interior.png',
        '/assets/images/interior2.png',
        '/assets/images/interior3.png',
      ],
      capacity: 'Up to 6 passengers',
      priceHour: 80,
      amenities: ['Wi-Fi', 'Music', 'TV', 'Drinks'],
      features: {
        luggage: true,
        wifi: true,
        music: true,
        tv: true,
        drinks: true,
        leatherInterior: true,
      },
    },
    {
      id: 'suburban-2023',
      name: 'Chevrolet Suburban',
      year: '2023',
      image: '/assets/images/suburban.png',
      interiorImages: [
        '/assets/images/interior.png',
        '/assets/images/interior2.png',
        '/assets/images/interior3.png',
      ],
      capacity: 'Up to 6 passengers',
      priceHour: 95,
      amenities: ['Wi-Fi', 'Music', 'TV', 'Drinks'],
      features: {
        luggage: true,
        wifi: true,
        music: true,
        tv: true,
        drinks: true,
        leatherInterior: true,
      },
    },
  ];

  const toggleVehicleDetails = (vehicleId: string) => {
    setExpandedVehicle(expandedVehicle === vehicleId ? null : vehicleId);
  };

  // Handle booking button clicks
  const handleBookNow = (vehicleId: string) => {
    if (user) {
      navigate(`/booking?vehicle=${vehicleId}`);
    } else {
      setSelectedVehicleId(vehicleId);
      setIsAuthModalOpen(true);
    }
  };

  // Redirect after successful login
  useEffect(() => {
    if (user && selectedVehicleId) {
      setIsAuthModalOpen(false); // Close modal
      navigate(`/booking?vehicle=${selectedVehicleId}`);
      setSelectedVehicleId(null); // Reset selection
    }
  }, [user, selectedVehicleId, navigate]);

  return (
    <div className="our-fleet-page">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat w-full h-[400px] md:h-[600px]"
        style={{ backgroundImage: "url('/assets/images/fleet.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container-custom relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-serif">Browse Our Luxury Vehicles</h1>
            <p className="text-sm md:text-base max-w-2xl mx-auto">
              Experience luxury transportation with our premium fleet of vehicles
            </p>
          </div>
        </div>
      </div>

      {/* Vehicle Cards Section */}
      <div className="py-16 bg-gradient-to-b from-white to-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fleetData.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-gradient-to-b from-white to-gray-50 rounded-lg overflow-hidden shadow-xl border border-gray-200 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2"
              >
                <div className="relative h-64 w-full">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                  <div className="absolute top-0 right-0 bg-blue-600 text-white py-1 px-4 rounded-bl-lg z-10">
                    <span className="text-sm font-semibold">20% OFF</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 font-serif text-gray-900">
                    {vehicle.name} {vehicle.year}
                  </h3>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">{vehicle.capacity}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {vehicle.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-500 mb-2">All inclusive</p>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-sm text-gray-500">From</p>
                      <p className="text-3xl font-bold text-gray-800">
                        ${vehicle.priceHour}
                        <span className="text-sm text-gray-500 font-normal">/ hour</span>
                      </p>
                    </div>
                    <button
                      onClick={() => toggleVehicleDetails(vehicle.id)}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      {expandedVehicle === vehicle.id ? 'Less details' : 'More details'}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ml-1 transition-transform ${
                          expandedVehicle === vehicle.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={() => handleBookNow(vehicle.id)}
                      className="w-full bg-blue-600 text-white text-center py-3 rounded-lg transition duration-300 hover:bg-blue-700"
                    >
                      Book Now
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedVehicle === vehicle.id && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-200 mt-2">
                    <h4 className="font-semibold mb-4">Vehicle Features</h4>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {vehicle.interiorImages.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`${vehicle.name} Interior ${index + 1}`}
                          className="rounded-md h-24 w-full object-cover"
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-y-2 mb-4">
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm">Wi-Fi</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm">Luggage Space</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm">Music System</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm">Leather Interior</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm">Complimentary Drinks</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm">Entertainment System</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      This week's chauffeured {vehicle.name} bookings: 87 hours
                    </p>
                    <button
                      onClick={() => handleBookNow(vehicle.id)}
                      className="block w-full text-center bg-gray-800 text-white py-3 rounded-lg transition duration-300 hover:bg-gray-900"
                    >
                      Book Limousine
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Services Section */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center font-serif text-gray-900">
            Additional Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105">
              <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Airport Transfers</h3>
              <p className="text-gray-600 mb-4">
                Enjoy stress-free transportation to and from all major airports in the Los Angeles and Orange County areas.
              </p>
              <a
                href="/services"
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                Learn more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105">
              <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Corporate Services</h3>
              <p className="text-gray-600 mb-4">
                Impress clients and provide executives with reliable, professional transportation for meetings and events.
              </p>
              <a
                href="/services"
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                Learn more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105">
              <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Special Events</h3>
              <p className="text-gray-600 mb-4">
                Make your special occasions unforgettable with our luxury transportation services for weddings, proms, and more.
              </p>
              <a
                href="/services"
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                Learn more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* AuthModal Integration */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView="login"
      />
    </div>
  );
};

export default OurFleet;