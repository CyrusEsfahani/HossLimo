import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Adjust path as needed
import AuthModal from '../components/auth/AuthModal'; // Import AuthModal from the auth folder

const OurStory: React.FC = () => {
  const { user } = useAuth(); // Get authentication status
  const navigate = useNavigate(); // For programmatic navigation
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // Control AuthModal visibility

  // Handle booking button click
  const handleBookJourney = () => {
    if (user) {
      navigate('/booking');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  // Redirect after successful login
  useEffect(() => {
    if (user && isAuthModalOpen) {
      setIsAuthModalOpen(false); // Close modal
      navigate('/booking');
    }
  }, [user, isAuthModalOpen, navigate]);

  return (
    <div className="our-story-page bg-gray-50">
      {/* Hero Section with Image Overlay */}
      <div
        className="relative bg-cover bg-center bg-no-repeat w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]"
        style={{ backgroundImage: "url('/assets/images/chauffeur-service.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
        <div className="container-custom relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 font-serif tracking-tight">
              Our Story
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Delivering excellence in luxury transportation since 2005
            </p>
          </div>
        </div>
      </div>

      {/* Founder Story Section */}
      <div className="py-16 md:py-24 bg-white">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-serif text-gray-900">
                Family-Owned Excellence
              </h2>
              <p className="text-gray-600 mb-4 text-base sm:text-lg leading-relaxed">
                Founded in 2005 by Serge Hossein, Hoss Limo began with a simple vision: to provide uncompromising luxury transportation with personalized service that exceeds expectations. With over two decades in the service industry, we've built our reputation on principles of reliability, comfort, and attention to detail.
              </p>
              <p className="text-gray-600 mb-4 text-base sm:text-lg leading-relaxed">
                What started as a single vehicle operation has grown into a premier fleet of meticulously maintained luxury vehicles, serving discerning clients throughout Los Angeles and Orange County. Our growth has been organic, built on referrals from satisfied clients who appreciate our dedication to excellence.
              </p>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Today, our family-owned business continues to uphold the values that have defined us since day one: impeccable service, professional chauffeurs, and a commitment to making every journey memorable.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-xl shadow-2xl">
                <img
                  src="/assets/images/hoss.png"
                  alt="Hoss Limo Founders"
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Vision & Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-1">
              <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-xl shadow-2xl">
                <img
                  src="/assets/images/luxury-service.jpg"
                  alt="Luxury Service"
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div className="order-2">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-serif text-gray-900">
                Our Vision & Mission
              </h2>
              <p className="text-gray-600 mb-4 text-base sm:text-lg leading-relaxed">
                At Hoss Limo, we envision redefining luxury transportation by creating experiences that transform travel from a necessity into a pleasure. Our mission is to provide an oasis of comfort and reliability in a fast-paced world, where every journey becomes an opportunity to relax, recharge, and arrive in style.
              </p>
              <p className="text-gray-600 mb-4 text-base sm:text-lg leading-relaxed">
                We believe that exceptional service begins with understanding our clients' unique needs and preferences. That's why we take the time to build relationships with each client, ensuring a personalized experience that anticipates their requirements before they even articulate them.
              </p>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Our commitment extends beyond transportation – we're dedicated to creating moments of luxury that enhance your overall experience, whether it's a corporate event, special celebration, or airport transfer.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 font-serif text-gray-900">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="inline-block p-4 bg-yellow-500 rounded-full text-white mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Safety & Reliability
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Your safety is our priority. Our vehicles undergo rigorous maintenance, and our professional chauffeurs are trained to provide secure and dependable service at all times.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="inline-block p-4 bg-yellow-500 rounded-full text-white mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Luxury Experience
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  We go beyond transportation to create a memorable experience, with attention to detail that transforms ordinary journeys into extraordinary experiences.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="inline-block p-4 bg-yellow-500 rounded-full text-white mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Client Satisfaction
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Your satisfaction drives our success. We're committed to exceeding expectations with personalized service tailored to your unique preferences and requirements.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-12 rounded-xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-serif">
              Experience the Hoss Limo Difference
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join our family of satisfied clients and discover why we're the preferred choice for luxury transportation in Los Angeles and Orange County.
            </p>
            <button
              onClick={handleBookJourney}
              className="inline-block bg-white text-yellow-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Book Your Journey
            </button>
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

export default OurStory;