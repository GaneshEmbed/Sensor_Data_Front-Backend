import axios from 'axios'; // Import axios for making HTTP requests
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, setError, resetError } from '../redux/reducers/registerReducer'; // Import actions

function Register() {
  const dispatch = useDispatch();
  const { formData, error } = useSelector(state => state.register); // Get form data and error from Redux

  // Handle input field changes and update Redux store dynamically
  const handleChange = (e) => {
    dispatch(updateFormData({ [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Reset any previous error
      dispatch(resetError());

      // Send POST request to the server to register the user
      await axios.post('http://13.233.204.86:5001/api/auth/register', formData);
      alert('Registration successful!'); // Notify the user
      window.location.href = '/login'; // Redirect to the login page
    } catch (error) {
      // Set error to Redux store
      dispatch(setError(error.response?.data?.message || 'Registration failed'));
      console.error('Registration failed:', error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100">
      {/* Registration form container */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-6xl"
      >
        {/* Page heading */}
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
          Create Your Account
        </h2>

        {/* Show error message */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        {/* Form fields organized in a grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="email"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              required
            />
          </div>

          {/* Country & State */}
          <div className="md:col-span-2 grid grid-cols-2 gap-8">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                required
              />
            </div>
          </div>

          {/* City & Zip Code */}
          <div className="md:col-span-2 grid grid-cols-2 gap-8">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          Register
        </button>

        {/* Login path if the user already has an account */}
        <div className="mt-4 text-center">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
