import React from 'react';
import { Link } from 'react-router-dom';
import { Service } from '../../types/reservations.types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
      <div className="h-48 overflow-hidden">
        <img 
          src={service.imageUrl} 
          alt={service.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-accent font-medium">{service.price}</span>
          <Link to="/booking" className="btn btn-outline text-sm py-2 px-4">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;