import { FaSpinner } from 'react-icons/fa';

const LoadingScreen = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="text-center text-white">
        <div className="animate-spin inline-block mb-4">
          <FaSpinner className="text-4xl" />
        </div>
        <p className="text-xl">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
