import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { ComponentType } from 'react';

// Type assertion for social icons
const FacebookIcon = FaFacebookF as ComponentType;
const InstagramIcon = FaInstagram as ComponentType;
const TwitterIcon = FaTwitter as ComponentType;

const About: React.FC = () => {
  return (
    <div className="about-page">
      {/* Hero Section with Image Wrapped Around */}
      <div
        className="relative bg-cover bg-center bg-no-repeat w-full h-[400px] md:h-[600px] lg:h-[800px]"
        style={{ backgroundImage: "url('/assets/images/SUV.png')" }}
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
              Phone: <a href="tel:+19499818417" className="text-gold hover:underline ml-1">(949) 981-8417</a>
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-12 bg-white">
        <div className="container-custom">
          {/* First Section: Paragraph then Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4 font-serif">
                What We Provide is Luxury Transport and a Comfortable Experience for You.
              </h2>
              <p className="text-gray-600">
                We specialize in delivering a comprehensive suite of services tailored to elevate your travel experience. Our offerings encompass rental limousine, chauffeur-driven journeys, and personalized concierge services. Whether you're seeking the independence of driving your own luxury vehicle, the refined service of a professional chauffeur, or curated concierge assistance, we are dedicated to a seamless and exceptional experience. With a commitment to excellence, we redefine travel by combining convenience, luxury, and unparalleled service, ensuring that every aspect of your journey exceeds expectations.
              </p>
            </div>
            <div>
              <img
                src="/assets/images/SUV.png" // Use the same image as the hero for consistency, or replace with a different one if desired
                alt="Luxury Vehicle"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Second Section: Paragraph then Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 font-serif">
                By choosing our services, you receive an all-inclusive experience for a single price!
              </h2>
              <p className="text-gray-600">
                When you opt for our services, you unlock the convenience of a comprehensive package tailored to your needs, all bundled into one transparent price. Our approach ensures you enjoy a seamless and stress-free experience, combining rental cars, expert chauffeurs, and concierge services, so you can focus on what truly matters—your journey, your comfort, and your peace of mind. With us, it’s not just a ride; it’s a commitment to providing you with the utmost luxury, convenience, and value, making every aspect of your travel exceptional and worry-free.
              </p>
              <div className="mt-6">
                <Link
                  to="/booking"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-700"
                >
                  Book now
                </Link>
              </div>
            </div>
            <div>
              <img
                src="/assets/images/SUV.png" // Replace with a different image if available
                alt="Luxury Interior"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl uppercase tracking-wider text-gray-500 mb-2">Our customers</h2>
          <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-8">TOP PRIORITY</h3>
          <p className="text-gray-600 mb-12">
            Discover a new standard of luxury travel with Hoss Limo, ensuring every mile is as luxurious as your destination.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-6xl font-bold mb-2">
                6<span className="text-sm align-top ml-1">MM</span>
              </h2>
              <p className="text-gray-600">Experience in Miles</p>
            </div>
            <div>
              <h2 className="text-6xl font-bold mb-2">
                44<span className="text-sm align-top ml-1">K</span>
              </h2>
              <p className="text-gray-600">Experience in Hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <img src="/logo-white.png" alt="Hoss Limo" className="h-8 mb-4" />
              <h3 className="text-xl font-serif font-bold mb-4">Hoss Limo</h3>
              <p className="text-gray-400 mb-4">
                Luxury transportation services for any occasion. Experience comfort and elegance with our professional chauffeur service.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-gold">
                  <FacebookIcon />
                </a>
                <a href="#" className="text-white hover:text-gold">
                  <InstagramIcon />
                </a>
                <a href="#" className="text-white hover:text-gold">
                  <TwitterIcon />
                </a>
              </div>
            </div>

            <div className="col-span-1">
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-400 hover:text-white">
                    What We Offer
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/booking" className="text-gray-400 hover:text-white">
                    Book Now
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="text-lg font-bold mb-4">Our Services</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Airport Transfers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Corporate Travel
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Special Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Point to Point
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Hourly Charter
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">123 Main Street, Los Angeles, CA 90001</li>
                <li className="text-gray-400">info@hosslimo.com</li>
                <li className="text-gray-400">(949) 981-8417</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;