import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DigitalClock } from './Clock/DigitalClock';

function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    const today = new Date();
    const formattedDate = today.toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    setCurrentDate(formattedDate);

    fetchUserData();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <>
      {/* Date Display */}
      {/* <div className="bg-gray-100 text-gray-800 py-2 flex justify-end items-center pr-6 space-x-4 font-medium">
        <span>{currentDate}</span>
      </div> */}

      {/* Navbar */}
      <div className="navbar bg-blue-200 text-white p-4 flex justify-between items-center">
        <Link to="/dashboard">
          <div className="text-2xl font-bold">Logo</div>
        </Link>

        <div className="flex items-center space-x-6">
          <DigitalClock />

          {/* User Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center space-x-2">
              <img src="/assets/user-logo.svg" alt="User Icon" className="h-6 w-6 rounded-full" />
            </button>

            {dropdownVisible && (
              <div className="absolute right-0 bg-white text-black rounded shadow-md mt-2 w-48">
                <ul>
                  {location.pathname === '/dashboard' ? (
                    <>
                      <li>
                        <Link
                          to="/profile-customization"
                          className="block px-4 py-2 hover:bg-gray-200"
                          onClick={() => setDropdownVisible(false)}
                        >
                          Profile Customization
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : location.pathname === '/profile-customization' ? (
                    <>
                      <li>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 hover:bg-gray-200"
                          onClick={() => setDropdownVisible(false)}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
