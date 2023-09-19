import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './chanelsSlice.js';
const store = configureStore({
  reducer: {
    channels: channelsReducer,
  },
});

export default store;
