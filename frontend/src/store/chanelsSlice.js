import { createSlice, createEntityAdapter, current } from '@reduxjs/toolkit';

const channelsAdaper = createEntityAdapter();
const initialState = channelsAdaper.getInitialState();
console.log('initialValue', initialState);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdaper.addOne,
    addChannels: channelsAdaper.addMany,
  },
});

export const { addChannel, addChannels } = channelsSlice.actions;
console.log('reducer', channelsSlice.reducer);

export default channelsSlice.reducer;
