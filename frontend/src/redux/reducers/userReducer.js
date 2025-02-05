import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: null,
  loading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUserDetails, setLoading } = userSlice.actions;
export default userSlice.reducer;
