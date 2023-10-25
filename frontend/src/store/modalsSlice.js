import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: null,
  channelId: null,
};

const modalsSlice = createSlice({
  name: 'Modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload.type;
      state.channelId = payload.id;
    },
    closeModal: (state) => {
      state.type = null,
      state.channelId = null;
    },
  },
});

export const getModalType = (state) => state.modals.type;
export const getChannelId = (state) => state.modals.channelId;
export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;