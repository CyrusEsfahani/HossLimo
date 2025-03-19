import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/ui/Hero";

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section with Video Background */}
      <Hero
        title="Elevate Your Journey with Unparalleled Luxury"
        subtitle="Where exceptional service meets sophisticated transportation. Experience the difference that defines true luxury with Hoss Limo's premium fleet and professional chauffeurs."
        buttonText="Reserve Your Experience"
        buttonLink="/booking"
        backgroundVideo="/assets/videos/webpage.mp4" // Replace with your video path
      />

      <section className="bg-white py-16">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden rounded-lg shadow-xl transition-transform duration-500 hover:scale-102 group">
            <img
              src="/assets/images/city.png"
              alt="Orange County"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-6 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-1 after:bg-blue-600 after:rounded-full pb-3">
              Discover Orange County
            </h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Orange County captivates with pristine beaches, vibrant cultural scenes, and 
              world-renowned attractions. Whether you're visiting for business endeavors 
              or leisurely pursuits, this coastal paradise offers unforgettable experiences 
              at every turn.
            </p>
            <ul className="space-y-3 text-gray-700 mb-8">
              {[
                "Premier access to John Wayne Airport (SNA)",
                "Iconic beaches including Laguna, Newport, and Huntington",
                "World-class attractions such as Disneyland and Knott's Berry Farm",
                "Idyllic year-round Mediterranean climate"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="inline-block w-5 h-5 mr-3 bg-blue-600 rounded-full flex-shrink-0"></span>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/services"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-5px] font-medium text-lg"
            >
              Experience Orange County
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              PREMIUM EXPERIENCE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Hoss Limo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We elevate transportation beyond mere convenience, delivering 
              an exceptional experience marked by meticulous attention to detail 
              and uncompromising excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ),
                title: "Impeccable Punctuality",
                description:
                  "Time is invaluable. Our commitment to precision ensures you arrive at your destination exactly when expected, every single time."
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                ),
                title: "Curated Luxury Fleet",
                description:
                  "Select from our meticulously maintained collection of premium vehicles, each representing the pinnacle of comfort, style, and performance."
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                ),
                title: "Elite Chauffeurs",
                description:
                  "Our distinguished chauffeurs combine extensive experience with impeccable professionalism, ensuring your journey exceeds expectations in every aspect."
              }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center group relative p-8 rounded-xl transition-all duration-300 hover:shadow-xl hover:bg-white">
                <div className="w-20 h-20 bg-blue-600 bg-opacity-10 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <svg
                    className="w-10 h-10 text-blue-600 transition-all duration-300 group-hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              EXCLUSIVE OFFERINGS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Premium Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From seamless airport transfers to bespoke event transportation, 
              our comprehensive solutions embody luxury at every touchpoint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                image: "/assets/images/privateJet.png",
                title: "Airport Transfers",
                description:
                  "Begin and conclude your journey in sophisticated comfort with our reliable airport transportation service, eliminating travel stress entirely."
              },
              {
                image: "/assets/images/corporate.png",
                title: "Corporate Travel",
                description:
                  "Make a distinguished impression with our executive transportation solutions for business meetings, corporate events, and professional engagements."
              },
              {
                image: "/assets/images/specialevent.png",
                title: "Special Events",
                description:
                  "Transform your significant occasions with our bespoke limousine services for weddings, anniversaries, galas, and milestone celebrations."
              }
            ].map((service, index) => (
              <div key={index} className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:translate-y-[-10px]">
                <div className="h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    to="/services"
                    className="flex items-center text-blue-600 font-medium text-lg group-hover:text-blue-700 transition-all"
                  >
                    <span>Explore Service</span>
                    <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link 
              to="/services" 
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-5px] font-medium text-lg"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 via-gray-100 to-[#1C2526] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1C2526] z-10"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute transform rotate-45 -left-1/4 -top-1/4 w-1/2 h-1/2 border-r-8 border-white rounded-full"></div>
          <div className="absolute transform -rotate-45 -right-1/4 -bottom-1/4 w-1/2 h-1/2 border-l-8 border-white rounded-full"></div>
        </div>
        
        <div className="container-custom text-center relative z-20">
          <span className="inline-block px-4 py-2 bg-blue-500 bg-opacity-100 text-blue-100 rounded-full text-sm font-medium mb-6">
            ELEVATE YOUR EXPERIENCE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Experience Transportation Redefined
          </h2>
          <p className="text-2xl max-w-3xl mx-auto mb-12 text-gray-100 leading-relaxed">
            Reserve your journey today and discover the distinction that defines true luxury.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/booking"
              className="px-10 py-5 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:translate-y-[-5px] transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-lg"
            >
              Reserve Your Experience
            </Link>
            <Link
              to="/contact"
              className="px-10 py-5 bg-white text-[#1C2526] rounded-md hover:bg-gray-100 hover:translate-y-[-5px] transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-lg"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;