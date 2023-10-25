import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel, getChatData } from './chanelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const channelId = action.payload;
        const restMessages = Object.values(state.entities).filter(
          (message) => message.channelId !== channelId
        );
        messagesAdapter.setAll(state, restMessages);
      })
      .addCase(getChatData.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action.payload.messages);
      });
  },
});

export const { addMessage, addMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
