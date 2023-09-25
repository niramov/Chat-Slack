import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './chanelsSlice.js';
import messagesReducer from './messagesSlice.js';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
});

export default store;
