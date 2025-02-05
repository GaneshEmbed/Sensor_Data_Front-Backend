import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from './redux/store/store';  // Import your Redux store


import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProfileCustomization from './components/ProfileCustomization';
import UnderDevelopment from './components/development/development';

function App() {
  return (
   <>
     <ToastContainer />
    {/* // Wrap your app with the Provider to pass the Redux store */}
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile-customization" element={<ProfileCustomization />} />
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="/path1" element={<UnderDevelopment />} />
          </Routes>
        </div>
      </Router>
    </Provider>
   </>
  );
}

export default App;
