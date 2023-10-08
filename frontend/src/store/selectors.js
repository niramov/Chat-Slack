import { createSelector } from 'reselect';

export const getCurrentChannelId = (state) => state.channels.currentChannelId;
const getMessages = (state) => {
  return state.messages.entities;
};
const getChannels = (state) => state.channels.entities;

export const getCurrentChannelMessages = createSelector([getCurrentChannelId, getMessages], (id, messages) => {
  console.log('id', id, 'message', messages);
  return Object.values(messages).filter((msg) => msg.channelId === id);
});

export const getChannelsName = createSelector([getChannels, getCurrentChannelId], (channels, id) => {
  const channel = Object.values(channels).find((ch) => ch.id === id);
  return channel?.name;
});
