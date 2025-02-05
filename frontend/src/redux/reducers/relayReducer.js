import { createSlice } from '@reduxjs/toolkit';

const RELAY_MODES = {
  OFF: 'off',
  ON: 'on',
  PULSE: 'pulse',
};

const initialState = {
  relay1Mode: RELAY_MODES.OFF,
  relay2Mode: RELAY_MODES.OFF,
};

const relaySlice = createSlice({
  name: 'relay',
  initialState,
  reducers: {
    setRelayMode: (state, action) => {
      const { relay, mode } = action.payload;
      const allowedModes = Object.values(RELAY_MODES);
      if (allowedModes.includes(mode)) {
        if (relay === 1) state.relay1Mode = mode;
        if (relay === 2) state.relay2Mode = mode;
      }
    },
    resetRelayModes: (state) => {
      state.relay1Mode = RELAY_MODES.OFF;
      state.relay2Mode = RELAY_MODES.OFF;
    },
    toggleRelayMode: (state, action) => {
      const { relay } = action.payload;
      const modes = Object.values(RELAY_MODES);
      const currentMode = relay === 1 ? state.relay1Mode : state.relay2Mode;
      const nextMode = modes[(modes.indexOf(currentMode) + 1) % modes.length];

      if (relay === 1) state.relay1Mode = nextMode;
      if (relay === 2) state.relay2Mode = nextMode;
    },
  },
});

export const { setRelayMode, resetRelayModes, toggleRelayMode } = relaySlice.actions;
export default relaySlice.reducer;