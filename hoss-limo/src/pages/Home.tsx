import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/ui/Hero';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section with Video Background */}
      <Hero
        title="Luxury Transportation for Every Occasion"
        subtitle="Experience the epitome of comfort, style and professionalism with Hoss Limo's premium transportation services."
        buttonText="Book Now"
        buttonLink="/booking"
        backgroundVideo="/assets/videos/webpage.mp4" // Replace with your video path
      />
      
      {/* Features Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Hoss Limo</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We pride ourselves on providing exceptional service and a luxurious experience for all your transportation needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Always On Time</h3>
              <p className="text-gray-600">
                Punctuality is our promise. We ensure you reach your destination on schedule, every time.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Luxury Fleet</h3>
              <p className="text-gray-600">
                Choose from our selection of premium vehicles, each maintained to the highest standards.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Chauffeurs</h3>
              <p className="text-gray-600">
                Our chauffeurs are experienced, professional, and dedicated to providing exceptional service.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Preview Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Premium Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From airport transfers to special events, we offer comprehensive luxury transportation solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/src/assets/images/vehicles/sedan.jpg" 
                  alt="Airport Transfer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Airport Transfers</h3>
                <p className="text-gray-600 mb-4">
                  Start and end your journey in comfort with our reliable airport pickup and drop-off service.
                </p>
                <Link to="/services" className="text-accent font-medium hover:underline">
                  Learn More →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/src/assets/images/vehicles/suv.jpg" 
                  alt="Corporate Travel" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Corporate Travel</h3>
                <p className="text-gray-600 mb-4">
                  Make a statement with our executive transportation for business meetings and corporate events.
                </p>
                <Link to="/services" className="text-accent font-medium hover:underline">
                  Learn More →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/src/assets/images/vehicles/limo.jpg" 
                  alt="Special Events" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Special Events</h3>
                <p className="text-gray-600 mb-4">
                  Elevate your special occasions with our luxury limousine services for weddings, proms, and more.
                </p>
                <Link to="/services" className="text-accent font-medium hover:underline">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services" className="btn btn-outline">
              View All Services
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-accent">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                "Exceptional service from start to finish. The chauffeur was professional, the vehicle immaculate, and they even accommodated our last-minute schedule change."
              </p>
              <div className="font-medium">
                <p className="text-gray-900">Sarah Johnson</p>
                <p className="text-gray-500 text-sm">Corporate Client</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-accent">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                "Used Hoss Limo for our wedding day and couldn't be happier. The driver was punctual and professional, and the limo was absolutely stunning. Made our special day even more memorable."
              </p>
              <div className="font-medium">
                <p className="text-gray-900">Michael & Emma Rodriguez</p>
                <p className="text-gray-500 text-sm">Wedding Clients</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-accent">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                "I regularly use Hoss Limo for airport transfers and they never disappoint. Always on time, excellent drivers, and luxurious vehicles. Highly recommended!"
              </p>
              <div className="font-medium">
                <p className="text-gray-900">David Thompson</p>
                <p className="text-gray-500 text-sm">Frequent Traveler</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Luxury Transportation?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">
            Book your ride today and let us exceed your expectations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/booking" className="btn btn-primary">
              Book Now
            </Link>
            <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-100">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;