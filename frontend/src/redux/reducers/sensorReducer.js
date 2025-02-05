import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  temp1: 0,
  temp2: 0,
  humidity1: 0,
  humidity2: 0,
  relayStatus1: 0, // Add relay status from backend 
  relayStatus2: 0, // Add relay status from backend
};

const sensorSlice = createSlice({
  name: 'sensor',
  initialState,
  reducers: {
    setSensorData: (state, action) => {
      return {
        ...state,
        temp1: `${action.payload.temp1}°C`,
        temp2: `${action.payload.temp2}°C`,
        humidity1: `${action.payload.humidity1}%`,
        humidity2: `${action.payload.humidity2}%`,
        relayStatus1: action.payload.relayStatus1,
        relayStatus2: action.payload.relayStatus2,
      };
    },
  },
});

export const { setSensorData } = sensorSlice.actions;
export default sensorSlice.reducer;