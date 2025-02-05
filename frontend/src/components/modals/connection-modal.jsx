import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Set app element for accessibility
if (typeof document !== 'undefined') {
  Modal.setAppElement('#root');
}

const WifiConnectionModal = ({ isOpen, onClose }) => {
  const [wifiName, setWifiName] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [security, setSecurity] = useState('None');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Connecting to:', { wifiName, wifiPassword, security });
    
    toast.success(`Connected to ${wifiName}`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
    });
    
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-md bg-white rounded-lg shadow-xl p-6"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">WiFi Connection</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            SSID Name
          </label>
          <input
            type="text"
            value={wifiName}
            onChange={(e) => setWifiName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter WiFi name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Security
          </label>
          <select
            value={security}
            onChange={(e) => setSecurity(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="None">None</option>
            <option value="WPA/WPA2-Personal">WPA/WPA2-Personal</option>
          </select>
        </div>
        
        <div className="mb-6 relative">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={wifiPassword}
            onChange={(e) => setWifiPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Connect
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default WifiConnectionModal;
