import { useDispatch } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import appSlice from './slices/appSlice';
import docsSlice from './slices/docsSlice';

const store = configureStore({
  reducer: {
    [appSlice.name]: appSlice.reducer,
    [docsSlice.name]: docsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
