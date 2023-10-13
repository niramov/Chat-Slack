import { createSelector } from 'reselect';

export const getCurrentChannelId = (state) => state.channels.currentChannelId;
const getMessages = (state) => {
  return state.messages.entities;
};

export const getChannels = (state) => {
  const channels = Object.values(state.channels.entities);
  return channels;
};

export const getCurrentChannelMessages = createSelector([getCurrentChannelId, getMessages], (id, messages) => {
  return Object.values(messages).filter((msg) => msg.channelId === id);
});

export const getChannelsName = createSelector([getChannels, getCurrentChannelId], (channels, id) => {
  const channel = channels.find((ch) => ch.id === id);
  return channel?.name;
});
