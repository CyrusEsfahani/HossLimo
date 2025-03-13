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
  console.log('Background Video:', backgroundVideo); // Debug log

  return (
    <div className="relative h-screen w-full">
      {/* Background Video or Image */}
      {backgroundVideo ? (
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
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
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      ) : null}

      {/* Content */}
      <div className="relative h-full container-custom flex flex-col justify-center items-start text-white">
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mb-4">{title}</h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8">{subtitle}</p>
        <Link to={buttonLink} className="btn btn-primary">
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default Hero;