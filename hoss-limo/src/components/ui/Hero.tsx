import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundVideo?: string;
  backgroundImage?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundVideo,
  backgroundImage,
}) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video or Image with overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      
      {backgroundVideo ? (
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover scale-105"
          playsInline // Added for mobile compatibility
        >
          <source src={backgroundVideo} type="video/mp4" />
          <source src={backgroundVideo.replace('.mp4', '.webm')} type="video/webm" /> {/* Fallback */}
          Your browser does not support the video tag.
        </video>
      ) : backgroundImage ? (
        <img
          src={backgroundImage}
          alt="Hero Background"
          className="absolute top-0 left-0 w-full h-full object-cover scale-105"
        />
      ) : null}
      
      {/* Content */}
      <div className="relative z-20 h-full container-custom flex flex-col justify-center items-start text-white">
        <div className="max-w-3xl animate-fadeIn">
          <h1 className="text-5xl md:text-6xl lg:text-5xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-1xl max-w-2xl mb-10 text-gray-100 leading-relaxed">
            {subtitle}
          </p>
          <Link 
            to={buttonLink} 
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-5px] font-medium text-lg"
          >
            {buttonText}
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-sm text-gray-300 mb-2">Scroll to explore</span>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;