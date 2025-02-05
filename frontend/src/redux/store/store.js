import { configureStore } from '@reduxjs/toolkit'; // Use configureStore instead of createStore
import userReducer from '../reducers/userReducer'; // Import your user reducer
import authReducer from '../reducers/authReducer';
import registerReducer from '../reducers/registerReducer'
import sensorReducer from '../reducers/sensorReducer'
import relayReducer from '../reducers/relayReducer'


// Set up the store using configureStore
const store = configureStore({
  reducer: {
    user: userReducer, // Combining the reducers
    auth: authReducer, // Using authReducer for authentication state
    register: registerReducer,
    sensor: sensorReducer,
    relay: relayReducer,
  },
});

export default store;
