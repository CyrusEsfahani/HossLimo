import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Adjust path as needed
import AuthModal from '../components/auth/AuthModal'; // Import AuthModal from the auth folder
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'; // Import framer-motion for animations

const OurStory: React.FC = () => {
  const { user } = useAuth(); // Get authentication status
  const navigate = useNavigate(); // For programmatic navigation
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // Control AuthModal visibility

  // Motion values for counters
  const yearsCount = useMotionValue(0);
  const tripsCount = useMotionValue(0);

  // Transform motion values to rounded numbers for display
  const yearsDisplay = useTransform(yearsCount, (value) => Math.round(value));
  const tripsDisplay = useTransform(tripsCount, (value) => Math.round(value));

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

  // Animate the counters when the component mounts
  useEffect(() => {
    // Animate years counter from 0 to 10
    yearsCount.set(0); // Reset to 0
    const yearsAnimation = animate(yearsCount, 10, { duration: 5, ease: [0.22, 1, 0.36, 1] });

    // Animate trips counter from 0 to 14658
    tripsCount.set(0); // Reset to 0
    const tripsAnimation = animate(tripsCount, 14658, { duration: 5, ease: [0.22, 1, 0.36, 1] });

    // Cleanup animations on unmount
    return () => {
      yearsAnimation.stop();
      tripsAnimation.stop();
    };
  }, [yearsCount, tripsCount]);

  return (
    <div className="our-story-page bg-gray-50">
      {/* Hero Section with Image Overlay */}
      <div
        className="relative bg-cover bg-center bg-no-repeat w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]"
        style={{ backgroundImage: "url('/assets/images/ourstory.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
        <div className="container-custom relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 font-serif tracking-tight">
              Our Story
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Delivering excellence in luxury transportation since 2022.
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
              Founded in 2022 by husband and wife team Hoss and Mahnaz, Hoss Limo is a small, family-owned business built on a shared passion for exceptional service and attention to detail. With just two luxury vehicles in our fleet, we’ve intentionally kept things small so we can focus on what matters most—delivering a truly personalized and professional transportation experience for our clients throughout Orange County.
              </p>
              <p className="text-gray-600 mb-4 text-base sm:text-lg leading-relaxed">
              Every ride with us reflects our commitment to quality, reliability, and comfort. With over 20 years of combined experience in the service industry, we pride ourselves on offering tailored, one-on-one service that larger companies simply can’t match. Whether you're heading to a special event, airport, or business meeting, we ensure a seamless and stress-free experience from start to finish.
              </p>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              At Hoss Limo, you're not just another passenger—you’re part of our extended family, and we treat every journey with the care and professionalism it deserves.
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
                  src="/assets/images/mission.png"
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

          {/* Our Achievements Section */}
          <div className="relative py-16 mb-16 text-center bg-white">
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 font-serif text-gray-900">
                Our Achievements
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
                {/* Years of Professional Driving */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-300/20 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-500"
                >
                  {/* Subtle Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{
                      boxShadow: [
                        '0 0 10px rgba(245, 158, 11, 0.2)',
                        '0 0 20px rgba(245, 158, 11, 0.4)',
                        '0 0 10px rgba(245, 158, 11, 0.2)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <div className="flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-yellow-500 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <motion.h3
                      className="text-5xl sm:text-6xl font-extrabold text-black"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                    >
                      <motion.span>{yearsDisplay}</motion.span>+
                    </motion.h3>
                  </div>
                  <p className="text-gray-600 text-base sm:text-lg font-medium">
                    Years of Professional Driving
                  </p>
                </motion.div>

                {/* Total Trips Completed */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                  className="relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-300/20 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-500"
                >
                  {/* Subtle Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{
                      boxShadow: [
                        '0 0 10px rgba(245, 158, 11, 0.2)',
                        '0 0 20px rgba(245, 158, 11, 0.4)',
                        '0 0 10px rgba(245, 158, 11, 0.2)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <div className="flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-yellow-500 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <motion.h3
                      className="text-5xl sm:text-6xl font-extrabold text-black"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                    >
                      <motion.span>{tripsDisplay}</motion.span>
                    </motion.h3>
                  </div>
                  <p className="text-gray-600 text-base sm:text-lg font-medium">
                    Total Trips Completed
                  </p>
                </motion.div>
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