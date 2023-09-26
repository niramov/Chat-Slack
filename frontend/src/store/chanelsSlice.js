import { createSlice, createEntityAdapter, current } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1,
  currentDefaultChannel: 1,
});

console.log('initialState', initialState);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    setCurrentChannel: (state, { payload }) => {
      console.log('currentState', current(state));
      state.currentChannelId = payload;
    },
    renameChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
    // getCurrentChannelName: (state) => {
    //   const currentChannel = Object.values(state.entities).find((ch) => ch.id === state.currentChannelId);
    //   return currentChannel.name;
    // },
  },
});

export const { addChannel, addChannels, setCurrentChannel, renameChannel, removeChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
