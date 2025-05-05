
import { configureStore } from '@reduxjs/toolkit';
import { reviewApi } from './services/reviewApi';

export const store = configureStore({
  reducer: {
    [reviewApi.reducerPath]: reviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reviewApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;