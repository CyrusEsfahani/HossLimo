import React from 'react';
import ServiceCard from '../components/ui/ServiceCard';
import { Service } from '../types/reservations.types';

const dummyServices: Service[] = [
  {
    id: '1',
    title: 'Airport Transfer',
    description: 'Experience seamless airport transfers with our luxury vehicles.',
    imageUrl: '/src/assets/images/vehicles/sedan.jpg',
    price: '$100',
  },
  {
    id: '2',
    title: 'Corporate Travel',
    description: 'Travel in style for your business meetings and events.',
    imageUrl: '/src/assets/images/vehicles/suv.jpg',
    price: '$150',
  },
    {
        id: '3',
        title: 'Special Events',
        description: 'Make your special events memorable with our luxury transportation.',
        imageUrl: '/src/assets/images/vehicles/van.jpg',
        price: '$200',
    },
    {
        id: '4',
        title: 'Point to Point',
        description: 'Get to your destination safely and comfortably with our point-to-point service.',
        imageUrl: '/src/assets/images/vehicles/sedan.jpg',
        price: '$80',
    },
    {
        id: '5',
        title: 'Hourly Charter',
        description: 'Enjoy the flexibility of our hourly charter service for your travel needs.',
        imageUrl: '/src/assets/images/vehicles/suv.jpg',
        price: '$120',
    },
];

const Services: React.FC = () => {
  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {dummyServices.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
