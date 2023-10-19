/* eslint-disable */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1,
  currentDefaultChannel: 1,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    setDefaultChannel: (state, { payload }) => {
      if (payload === state.currentChannelId) {
        state.currentChannelId = state.currentDefaultChannel;
      }
    },
    renameChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
  },
});

export const {
  addChannel,
  addChannels,
  setCurrentChannel,
  renameChannel,
  removeChannel,
  setDefaultChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
