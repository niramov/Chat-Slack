import { createSelector } from 'reselect';

const currentChannelId = (state) => state.channels.currentChannelId;
const getMessages = (state) => state.messages;
const getChannels = (state) => state.channels.entities;

export const getCurrentChannelMessages = createSelector([currentChannelId, getMessages], (id, messages) => {
  return Object.values(messages.entities).filter((msg) => msg.id === id).length;
});

export const getChannelsName = createSelector([getChannels, currentChannelId], (channels, id) => {
  console.log('channels in selectors', channels);
  const channel = Object.values(channels).find((ch) => ch.id === id);
  return channel.name;
});
