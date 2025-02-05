import React from 'react';
import { Link } from 'react-router-dom';
import { FaTools } from 'react-icons/fa'; // Using a construction tools icon for illustration


const UnderDevelopment = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-md rounded-lg max-w-md mx-auto">
        <FaTools className="text-4xl mb-4 text-gray-600" />

        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Under Development</h1>
        
        <p className="text-gray-600 mb-6">
          We're working on this page. Please check back later.
        </p>
        
        <Link to="/dashboard">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg text-lg transition duration-200">
            Go Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default UnderDevelopment;  

