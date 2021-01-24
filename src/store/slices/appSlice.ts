import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isInitialized: false,
  },
  reducers: {
    setAppInitialized: (state) => {
      state.isInitialized = true;
    },
  },
});

export default appSlice;
