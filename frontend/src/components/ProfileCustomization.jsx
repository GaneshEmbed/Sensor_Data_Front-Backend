import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Navbar from './Navbar'; // Import Navbar Component

function ProfileCustomization() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    companyAddress: '',
    companyName: '',
    gstNumber: '',
  });

  const [loading, setLoading] = useState(true); // Loading state to show a spinner
  const navigate = useNavigate(); // Initialize the navigate hook for redirection

  useEffect(() => {
    // Fetch the current user data when the page loads
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setFormData(response.data); // Set the fetched data into the form
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        'http://localhost:5000/api/auth/update',
        { ...formData },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert(response.data.message);
      navigate('/dashboard'); // Redirect to dashboard after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Profile update failed');
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        {/* Profile Customization Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            Customize Your Profile
          </h2>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50 border-solid"></div>
              <p className="text-lg font-medium text-gray-600">Loading...</p>
            </div>
          ) : (
            // Form Fields
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="mobileNumber" className="block text-gray-700 font-medium mb-2">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  required
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  required
                />
              </div>

              {/* Country & State */}
              <div className="md:col-span-2 grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    required
                  />
                </div>
              </div>

              {/* City & Zip Code */}
              <div className="md:col-span-2 grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-gray-700 font-medium mb-2">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    required
                  />
                </div>
              </div>

              {/* Optional Company Information */}
              <div className="md:col-span-2">
                <label htmlFor="companyName" className="block text-gray-700 font-medium mb-2">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="companyAddress" className="block text-gray-700 font-medium mb-2">
                  Company Address (Optional)
                </label>
                <input
                  type="text"
                  id="companyAddress"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="gstNumber" className="block text-gray-700 font-medium mb-2">
                  GST Number (Optional)
                </label>
                <input
                  type="text"
                  id="gstNumber"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>
            </div>
          )}

          {/* Save Changes Button */}
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="mt-6 w-full md:w-1/3 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileCustomization;
