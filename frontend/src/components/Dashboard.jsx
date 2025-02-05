import axios from 'axios';
import React, { useEffect } from 'react';
import { FaTemperatureHigh, FaTint } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client'; // Import Socket.IO client
import Navbar from './Navbar';
import Sidebar from './Sidebar/Sidebar';
import Loading from './Loader/Loading';
import { setUserDetails, setLoading } from '../redux/reducers/userReducer';
import { setSensorData } from '../redux/reducers/sensorReducer';
import { setRelayMode } from '../redux/reducers/relayReducer';

function Dashboard() {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.user.userDetails);
  const loading = useSelector((state) => state.user.loading);
  const sensorData = useSelector((state) => state.sensor);
  const { relay1Mode, relay2Mode } = useSelector((state) => state.relay);

  // Initialize Socket.IO connection
  useEffect(() => {
    const socket = io('http://localhost:5000', {
      reconnection: true, // Enable reconnection
      reconnectionAttempts: 5, // Number of reconnection attempts
      reconnectionDelay: 1000, // Delay between reconnection attempts
    });

    socket.on('connect', () => {
      console.log('Socket.IO Connected!');
    });

    socket.on('newSensorData', (data) => {
      console.log('Real-time update:', data); // Debug incoming data

      // Update sensor data
      dispatch(setSensorData({
        temp1: data.temp1,
        temp2: data.temp2,
        humidity1: data.humidity1,
        humidity2: data.humidity2,
        relayStatus1: data.relay1Status,
        relayStatus2: data.relay2Status,
      }));

      // Update relay mode in Redux store
      dispatch(setRelayMode({ relay: 1, mode: data.relay1Status === 1 ? 'on' : data.relay1Status === 2 ? 'pulse' : 'off' }));
      dispatch(setRelayMode({ relay: 2, mode: data.relay2Status === 1 ? 'on' : data.relay2Status === 2 ? 'pulse' : 'off' }));
    });

    socket.on('disconnect', () => {
      console.log('Socket.IO Disconnected!');
    });

    socket.on('reconnect', () => {
      console.log('Socket.IO Reconnected!');
      fetchSensorData(); // Fetch latest data after reconnection
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/refresh', { refreshToken });
      const newAccessToken = response.data.accessToken;
      localStorage.setItem('token', newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing token', error);
      return null;
    }
  };

  const fetchUserDetails = async (accessToken) => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(setUserDetails(response.data));
    } catch (error) {
      if (error.response?.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          fetchUserDetails(newAccessToken);
        } else {
          alert('Session expired. Please log in again.');
          window.location.href = '/login';
        }
      } else {
        console.error('Error fetching user details', error);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchSensorData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sensor/data');
      const { temp1, temp2, humidity1, humidity2, relay1Status, relay2Status } = response.data;

      // Update sensor data
      dispatch(setSensorData({
        temp1: temp1,
        temp2: temp2,
        humidity1: humidity1,
        humidity2: humidity2,
        relayStatus1: relay1Status,
        relayStatus2: relay2Status,
      }));

      // Update relay mode in Redux store
      dispatch(setRelayMode({ relay: 1, mode: relay1Status === 1 ? 'on' : relay1Status === 2 ? 'pulse' : 'off' }));
      dispatch(setRelayMode({ relay: 2, mode: relay2Status === 1 ? 'on' : relay2Status === 2 ? 'pulse' : 'off' }));
    } catch (error) {
      console.error('Error fetching sensor data', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setLoading(true));
      fetchUserDetails(token);
      fetchSensorData();
    } else {
      alert('No token found. Please log in.');
      window.location.href = '/login';
    }
  }, [dispatch]);

  // Dashboard.js
  const handleRelayChange = async (relay, mode) => {
    try {
      const status = mode === 'on' ? 1 : mode === 'pulse' ? 2 : 0;
      const relayKey = `relay${relay}Status`; // Dynamic key: relay1Status or relay2Status

      // Optimistic update
      dispatch(setRelayMode({ relay, mode }));

      // Send update to backend
      const response = await axios.put(
        'http://localhost:5000/api/sensor/update-relay',
        { [relayKey]: status } // Correct payload format
      );

      console.log('Relay update confirmed:', response.data);
    } catch (error) {
      console.error('Update failed:', error);

      // Revert optimistic update
      const previousStatus = relay === 1 ?
        sensorData.relayStatus1 : sensorData.relayStatus2;
      const previousMode =
        previousStatus === 1 ? 'on' : previousStatus === 2 ? 'pulse' : 'off';

      dispatch(setRelayMode({ relay, mode: previousMode }));
    }
  };

  const relayStyle = (mode) => {
    switch (mode) {
      case 'on':
        return 'bg-gradient-to-r from-green-400 to-green-600';
      case 'pulse':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 'off':
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-600';
    }
  };

  const getTemperatureGradient = (temperature) => {
    const tempValue = parseFloat(temperature);
    if (tempValue <= -10) return 'from-blue-800 to-blue-400';
    if (tempValue <= 0) return 'from-blue-500 to-blue-300';
    if (tempValue <= 20) return 'from-blue-300 to-teal-400';
    if (tempValue <= 40) return 'from-yellow-300 to-yellow-600';
    if (tempValue <= 60) return 'from-orange-400 to-red-500';
    if (tempValue <= 80) return 'from-red-500 to-red-700';
    return 'from-red-700 to-red-900';
  };

  const getHumidityGradient = (humidity) => {
    const humidityValue = parseFloat(humidity);
    if (humidityValue <= 30) return 'from-gray-300 to-blue-400';
    if (humidityValue <= 60) return 'from-green-400 to-green-600';
    if (humidityValue <= 80) return 'from-yellow-400 to-orange-500';
    return 'from-red-500 to-red-700';
  };

  // Dashboard.js (socket.io useEffect)
  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('newSensorData', (data) => {
      console.log('Real-time update:', data); // Debug incoming data
      dispatch(setSensorData({ ...data }));
    });

    return () => socket.disconnect();
  }, [dispatch]);
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 transition-all duration-300">
        <Navbar />
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Welcome {userDetails?.firstName || 'User'}
          </h1>

          {loading ? (
            <Loading />
          ) : (
            <div>
              {/* Sensor Data Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-6">
                {/* Temperature Cards */}
                <div
                  className={`bg-gradient-to-r ${getTemperatureGradient(sensorData.temp1)} p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300`}
                >
                  <div className="flex flex-col items-center">
                    <FaTemperatureHigh className="text-4xl text-indigo-100 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Temperature 1</h3>
                    <p className="text-3xl font-bold text-white">{sensorData.temp1}</p>
                    <p className="text-lg font-light text-white">Temperature (°C)</p>
                  </div>
                </div>
                <div
                  className={`bg-gradient-to-r ${getTemperatureGradient(sensorData.temp2)} p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300`}
                >
                  <div className="flex flex-col items-center">
                    <FaTemperatureHigh className="text-4xl text-indigo-100 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Temperature 2</h3>
                    <p className="text-3xl font-bold text-white">{sensorData.temp2}</p>
                    <p className="text-lg font-light text-white">Temperature (°C)</p>
                  </div>
                </div>

                {/* Humidity Cards */}
                <div
                  className={`bg-gradient-to-r ${getHumidityGradient(sensorData.humidity1)} p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300`}
                >
                  <div className="flex flex-col items-center">
                    <FaTint className="text-4xl text-green-100 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Humidity 1</h3>
                    <p className="text-3xl font-bold text-white">{sensorData.humidity1}</p>
                    <p className="text-lg font-light text-white">Relative Humidity (RH)</p>
                  </div>
                </div>
                <div
                  className={`bg-gradient-to-r ${getHumidityGradient(sensorData.humidity2)} p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300`}
                >
                  <div className="flex flex-col items-center">
                    <FaTint className="text-4xl text-green-100 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Humidity 2</h3>
                    <p className="text-3xl font-bold text-white">{sensorData.humidity2}</p>
                    <p className="text-lg font-light text-white">Relative Humidity (RH)</p>
                  </div>
                </div>
              </div>

              {/* Relays Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                {/* Relay 1 */}
                <div className="w-full p-6 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
                  <h3 className="text-2xl font-semibold text-center text-white mb-2">Relay 1</h3>
                  <div className="w-full bg-gray-200 rounded-full h-8 mb-4">
                    <div
                      className={`h-8 rounded-full transition-all duration-500 ${relayStyle(relay1Mode)}`}
                      style={{
                        width: relay1Mode === 'on' ? '100%' : relay1Mode === 'pulse' ? '60%' : '0%',
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-white">
                      <input
                        type="radio"
                        name="relay1"
                        value="off"
                        checked={relay1Mode === 'off'}
                        onChange={() => handleRelayChange(1, 'off')}
                        className="form-radio h-4 w-4 text-gray-400"
                      />
                      <span>Off</span>
                    </label>

                    <label className="flex items-center space-x-2 text-white">
                      <input
                        type="radio"
                        name="relay1"
                        value="pulse"
                        checked={relay1Mode === 'pulse'}
                        onChange={() => handleRelayChange(1, 'pulse')}
                        className="form-radio h-4 w-4 text-yellow-500"
                      />
                      <span>Pulse</span>
                    </label>

                    <label className="flex items-center space-x-2 text-white">
                      <input
                        type="radio"
                        name="relay1"
                        value="on"
                        checked={relay1Mode === 'on'}
                        onChange={() => handleRelayChange(1, 'on')}
                        className="form-radio h-4 w-4 text-green-600"
                      />
                      <span>On</span>
                    </label>
                  </div>
                </div>

                {/* Relay 2 */}
                <div className="w-full p-6 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
                  <h3 className="text-2xl font-semibold text-center text-white mb-2">Relay 2</h3>
                  <div className="w-full bg-gray-200 rounded-full h-8 mb-4">
                    <div
                      className={`h-8 rounded-full transition-all duration-500 ${relayStyle(relay2Mode)}`}
                      style={{
                        width: relay2Mode === 'on' ? '100%' : relay2Mode === 'pulse' ? '60%' : '0%',
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-white">
                      <input
                        type="radio"
                        name="relay2"
                        value="off"
                        checked={relay2Mode === 'off'}
                        onChange={() => handleRelayChange(2, 'off')}
                        className="form-radio h-4 w-4 text-gray-400"
                      />
                      <span>Off</span>
                    </label>

                    <label className="flex items-center space-x-2 text-white">
                      <input
                        type="radio"
                        name="relay2"
                        value="pulse"
                        checked={relay2Mode === 'pulse'}
                        onChange={() => handleRelayChange(2, 'pulse')}
                        className="form-radio h-4 w-4 text-yellow-500"
                      />
                      <span>Pulse</span>
                    </label>

                    <label className="flex items-center space-x-2 text-white">
                      <input
                        type="radio"
                        name="relay2"
                        value="on"
                        checked={relay2Mode === 'on'}
                        onChange={() => handleRelayChange(2, 'on')}
                        className="form-radio h-4 w-4 text-green-600"
                      />
                      <span>On</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;