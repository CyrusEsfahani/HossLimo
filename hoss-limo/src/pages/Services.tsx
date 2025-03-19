import React from 'react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const dummyServices = [
    {
      id: '1',
      title: 'Airport Transfers',
      description:
        'Travel in style to and from the airport with our luxury airport transfer service.',
      imageUrl: '/assets/images/privateJet.png',
    },
    {
      id: '2',
      title: 'Corporate Travel',
      description: 'Travel in style for your business meetings and events.',
      imageUrl: '/assets/images/corporate.png',
    },
    {
      id: '3',
      title: 'Special Events',
      description: 'Make your special events memorable with our luxury transportation.',
      imageUrl: '/assets/images/specialevent.png',
    },
    {
      id: '4',
      title: 'Point to Point',
      description:
        'Reach your destination safely and comfortably with our point-to-point service.',
      imageUrl: '/assets/images/city.png',
    },
    {
      id: '5',
      title: 'Hourly Charter',
      description: 'Enjoy the flexibility of our hourly charter service for your travel needs.',
      imageUrl: '/assets/images/charter.png',
    },
    {
      id: '6',
      title: 'Family Vacation',
      description:
        'Make your family vacation unforgettable with our luxury transportation.',
      imageUrl: '/assets/images/family.png',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat w-full h-[400px] md:h-[600px] lg:h-[700px]"
        style={{ backgroundImage: "url('/assets/images/LA.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container-custom relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-sm md:text-base font-semibold mb-2 font-serif">
              Hoss Limo Service in Los Angeles and Orange County
            </h1>
            <p className="text-xs md:text-sm flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Phone:{' '}
              <a href="tel:+19499818417" className="text-gold hover:underline ml-1">
                (949) 981-8417
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: We Value Our Clients */}
      <div className="bg-white py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            We Value Our Clients And Want Them To Have A Nice Experience
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            Welcome to Hoss Limo, your trusted partner in luxury transportation in California. 
            We take pride in offering top-of-the-line vehicles to ensure
            every journey is comfortable, safe, and unforgettable. Whether you’re traveling for
            business, celebrating a special occasion, or exploring local attractions, our
            dedicated team is here to exceed your expectations.
          </p>
        </div>
      </div>

      {/* Section 2: We Care About Your Comfort */}
      <div className="bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="order-1 md:order-none">
            <img
              src="/assets/images/Comfort.png"
              alt="Professional Driver"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We Care About Your Comfort And Safety
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              At Hoss Limo, your comfort and safety are our top priorities. Our fleet is meticulously
              maintained, and our professional chauffeurs ensure that every ride is tailored to
              your needs. From the moment you book with us, we go the extra mile to make every
              journey an experience that exceeds your expectations. Relax, enjoy the ride, and let
              us handle the details.
            </p>
            <Link
              to="/booking"
              className="inline-block bg-black text-white font-semibold py-3 px-6 rounded-lg shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="bg-white py-12">
        <div className="container-custom pt-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-14">
            Explore our comprehensive range of luxury transportation services tailored to your
            needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dummyServices.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link
                    to="/booking"
                    className="text-black font-medium hover:underline flex items-center"
                  >
                    Book Now
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
