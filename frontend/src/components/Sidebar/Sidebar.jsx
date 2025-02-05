import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaDoorOpen, FaWifi, FaBell } from 'react-icons/fa';
import WifiConnectionModal from '../modals/connection-modal';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isWifiModalOpen, setIsWifiModalOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const openWifiModal = () => setIsWifiModalOpen(true);
  const closeWifiModal = () => setIsWifiModalOpen(false);

  return (
    <div
      className={`flex flex-col bg-blue-200 text-white min-h-screen p-6 shadow-md transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <button onClick={toggleSidebar} className="text-white mb-6 flex justify-end">
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div className="flex flex-col space-y-6">
        {isOpen && (
          <h2 className="text-2xl font-bold text-center text-indigo-500 transition-all duration-300 mb-6">
            Dashboard
          </h2>
        )}

        <Link to="/path1" className={`flex items-center text-gray-500 p-4 rounded-lg transition-all duration-300 ${isOpen ? 'hover:text-white hover:bg-indigo-600 justify-start' : 'justify-center cursor-default'}`}>
          <FaHome size={24} />
          {isOpen && <span className="ml-4 text-lg font-medium">Menu</span>}
        </Link>

        <Link to="/path1" className={`flex items-center text-gray-500 p-4 rounded-lg transition-all duration-300 ${isOpen ? 'hover:text-white hover:bg-indigo-600 justify-start' : 'justify-center cursor-default'}`}>
          <FaDoorOpen size={24} />
          {isOpen && <span className="ml-4 text-lg font-medium">Door</span>}
        </Link>

        <button onClick={openWifiModal} className={`flex items-center text-gray-500 p-4 rounded-lg transition-all duration-300 ${isOpen ? 'hover:text-white hover:bg-indigo-600 justify-start' : 'justify-center cursor-default'}`}>
          <FaWifi size={24} />
          {isOpen && <span className="ml-4 text-lg font-medium">Connectivity</span>}
        </button>

        <Link to="/path1" className={`flex items-center text-gray-500 p-4 rounded-lg transition-all duration-300 ${isOpen ? 'hover:text-white hover:bg-indigo-600 justify-start' : 'justify-center cursor-default'}`}>
          <FaBell size={24} />
          {isOpen && <span className="ml-4 text-lg font-medium">Alarm</span>}
        </Link>
      </div>

      <WifiConnectionModal isOpen={isWifiModalOpen} onClose={closeWifiModal} />
    </div>
  );
}

export default Sidebar;
