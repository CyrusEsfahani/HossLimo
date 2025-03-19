import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Hoss Limo" className="h-10" />
          <span className="ml-2 text-xl font-serif font-bold">Hoss Limo</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/services" className="hover:text-gold">What We Offer</Link></li>
            <li><Link to="/about" className="hover:text-gold">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/booking" className="hover:text-gold">Book Now</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;