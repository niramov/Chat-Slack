import { createSelector } from 'reselect';

const currentChannelId = (state) => state.channels.currentChannelId;
const getMessages = (state) => {
  console.log('state', state);
  return state.messages.entities;
};
const getChannels = (state) => state.channels.entities;

export const getCurrentChannelMessages = createSelector([currentChannelId, getMessages], (id, messages) => {
  return Object.values(messages).filter((msg) => msg.id === id).length;
});

export const getChannelsName = createSelector([getChannels, currentChannelId], (channels, id) => {
  console.log('channels in selectors', channels);
  console.log('id', id);
  const channel = Object.values(channels).find((ch) => ch.id === id);
  console.log('channel', channel);
  return channel?.name;
});
