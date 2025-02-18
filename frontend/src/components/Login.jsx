import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../redux/reducers/authReducer';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, formData);

      dispatch(loginSuccess({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }));
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      alert('Logged in Successfully');
      navigate('/dashboard');
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
      console.error('Login failed:', error.response?.data?.error || error.message);
      dispatch(loginFailure(error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl w-full sm:w-96 max-w-sm transition-transform duration-500 transform hover:scale-105">
        <h2 className="text-3xl text-center font-semibold text-gray-800 mb-6">Login</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="mb-6">
          <label htmlFor="username" className="block text-gray-600 font-medium mb-2">User Name or Email</label>
          <input
            type="text"  // ✅ Now allows usernames & emails
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-blue-400"
            required
            placeholder="Enter your username or email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-600 font-medium mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:border-blue-400"
            required
            placeholder="Enter your password"
          />
        </div>

        <div className="flex justify-center mb-6">
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            Login
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
