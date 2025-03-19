import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faClock, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

// Define quick links with correct routes
const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'What We Offer', path: '/services' },
  { name: 'Our Story', path: '/about' },
  { name: 'Contact Us', path: '/contact' },
  { name: 'Book Now', path: '/booking' },
];

// Define services (non-link items)
const services = [
  'Airport Transfers',
  'Corporate Travel',
  'Special Events',
  'Point to Point',
  'Hourly Charter',
];

// Define the HossLimoLogo component with customizable width and height
const HossLimoLogo = ({ width = 150, height = 30 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 60"
    width={width}
    height={height}
  >
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#DAA520", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text
      x="10"
      y="40"
      fontFamily="'Cinzel', serif"
      fontSize="36"
      fontWeight="700"
      fill="url(#goldGradient)"
      letterSpacing="1.5"
    >
      HOSS LIMO
    </text>
    <rect
      x="10"
      y="45"
      width="130"
      height="1"
      fill="url(#goldGradient)"
      opacity="0.7"
    />
  </svg>
);

const Footer: React.FC = () => {
  const goldColor = '#D4AF37'; // Gold color for consistency

  // State to track scroll position
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update scroll progress on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: 'spring', stiffness: 80 }}
      viewport={{ once: true }}
      className="bg-[#1C2526] text-white py-20 relative overflow-hidden"
    >
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info with Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring', stiffness: 100 }}
            className="space-y-6"
          >
            <Link to="/" className="inline-block hover:scale-105 transition-transform duration-300">
              <HossLimoLogo width={240} height={48} />
            </Link>
            <p className="text-gray-300 leading-relaxed">
              Discover a new standard of luxury travel with Hoss Limo, ensuring every mile is as luxurious as your destination.
            </p>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3 text-gold" /> Orange County, CA
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3 text-gold" />{' '}
                <a href="tel:+15551234567" className="text-gold hover:underline">
                  (949)-981-8497
                </a>
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-gold" />{' '}
                <a href="mailto:info@hosslimo.com" className="text-gold hover:underline">
                  hossein48.esfahani@gmail.com
                </a>
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon icon={faClock} className="mr-3 text-gold" /> 24 Hours Support Everyday
              </p>
            </div>
          </motion.div>

          {/* Quick Links with Enhanced Animations */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 100 }}
          >
            <h3 className="text-xl font-bold mb-6 text-gold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ scale: 1.05, color: '#D4AF37' }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 120,
                  }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-400 transition-all duration-300 ease-in-out relative group"
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services with Enhanced Animations */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8, type: 'spring', stiffness: 100 }}
          >
            <h3 className="text-xl font-bold mb-6 text-gold">Our Services</h3>
            <ul className="space-y-3 text-gray-400">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ scale: 1.05, color: '#D4AF37' }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 120,
                  }}
                  className="relative group"
                >
                  {service}
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Book Now Button with Enhanced Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ scale: [1, 1.06, 1], rotate: [0, 5, -5, 0] }}
            transition={{
              delay: 0.8,
              duration: 0.8,
              animate: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="flex justify-end"
          >
            <Link
              to="/booking"
              className="relative inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-110 group"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="absolute inset-0 rounded-full border-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </motion.div>
        </div>

        {/* Footer Bottom with Separator Removed */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          © 2025 Hoss Limo. All rights reserved.
        </div>

        {/* Enhanced Back-to-Top Button with Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 right-8 flex items-center gap-4"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6, type: 'spring', stiffness: 100 }}
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-gold text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-gold/90 transition-all duration-300"
            aria-label="Back to top"
          >
            <FontAwesomeIcon icon={faArrowUp} size="lg" />
          </motion.button>
          <motion.div
            className="w-2 h-20 bg-gray-600 rounded-l-lg overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: scrollProgress > 0 ? '100%' : '0%' }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-full h-full bg-gold"
              style={{ height: `${scrollProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;