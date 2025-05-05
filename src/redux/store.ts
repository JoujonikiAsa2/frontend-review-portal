
import { configureStore } from '@reduxjs/toolkit';
import { reviewApi } from './services/reviewApi';
import { commentApi } from './services/commentApi';

export const store = configureStore({
  reducer: {
    [reviewApi.reducerPath]: reviewApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(reviewApi.middleware)
      .concat(commentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;