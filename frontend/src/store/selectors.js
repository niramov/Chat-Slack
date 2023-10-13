import { createSelector } from 'reselect';

export const getCurrentChannelId = (state) => state.channels.currentChannelId;
const getMessages = (state) => {
  return state.messages.entities;
};

export const getChannels = (state) => {
  const channels = state.channels.entities;
  return channels;
};

export const getCurrentChannelMessages = createSelector([getCurrentChannelId, getMessages], (id, messages) => {
  return Object.values(messages).filter((msg) => msg.channelId === id);
});

export const getChannelsName = createSelector([getChannels, getCurrentChannelId], (channels, id) => {
  const channelsList = Object.values(channels);
  const channel = channelsList.find((ch) => ch.id === id);
  return channel?.name;
});
