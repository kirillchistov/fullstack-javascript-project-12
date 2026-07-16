import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import uiReducer from './uiSlice.js';
import { channelsApi } from './channelsApi.js';
import { messagesApi } from './messagesApi.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware)
    .concat(messagesApi.middleware),
});

export default store;
