import React from 'react';
import { FiBookOpen, FiCoffee, FiFeather } from 'react-icons/fi';
import StreamingImage from '../../../components/StreamingImage';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-gray-600 to-gray-600 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 py-8 sm:py-16 md:py-20 lg:py-28 lg:max-w-2xl lg:w-full">
          <div className="relative text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline">Welcome to Our</span>{' '}
              <span className="block text-yellow-300 xl:inline">Inspiring Blog</span>
            </h1>
            <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Discover thought-provoking articles, expert insights, and captivating stories that will ignite your curiosity and broaden your horizons.
            </p>
            <div className="mt-10 flex justify-center lg:justify-start space-x-6 text-white">
              <div className="flex flex-col items-center">
                <FiBookOpen className="h-10 w-10" />
                <span className="mt-2 text-sm">Engaging Reads</span>
              </div>
              <div className="flex flex-col items-center">
                <FiCoffee className="h-10 w-10" />
                <span className="mt-2 text-sm">Daily Inspiration</span>
              </div>
              <div className="flex flex-col items-center">
                <FiFeather className="h-10 w-10" />
                <span className="mt-2 text-sm">Expert Writers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:block hidden lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <StreamingImage
          src="/blog-hero.jpg"
          alt="Blog hero image"
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white"></div>
    </div>
  );
};

export default Hero;

