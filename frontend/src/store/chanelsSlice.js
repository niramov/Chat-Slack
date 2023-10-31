/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes/routes';

export const getChatData = createAsyncThunk('channels/getChatData', async (headers) => {
  const response = await axios.get(routes.usersPath(), { headers });
  return response.data;
});

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1,
  currentDefaultChannel: 1,
  error: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      channelsAdapter.addOne(state, action.payload);
      // state.currentChannelId = action.payload.id;
    },
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
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        state.currentChannelId = state.currentDefaultChannel;
      }
      channelsAdapter.removeOne(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatData.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
        state.error = null;
      })
      .addCase(getChatData.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export const getError = (state) => state.channels.error;

export const {
  addChannel,
  addChannels,
  setCurrentChannel,
  renameChannel,
  removeChannel,
  setDefaultChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
