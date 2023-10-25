import { createSelector } from 'reselect';

export const getCurrentChannelId = (state) => state.channels.currentChannelId;
const getMessages = (state) => state.messages.entities;

export const getChannels = (state) => {
  const channels = state.channels.entities;
  console.log('selector channels', channels);
  return channels;
};

export const getCurrentChannel = (state) => {
  const { channelId } = state.modals;
  const channels = Object.values(state.channels.entities);
  return channels.find((channel) => channel.id === channelId);
};

export const getCurrentChannelMessages = createSelector(
  [getCurrentChannelId, getMessages],
  (id, messages) => Object.values(messages).filter((msg) => msg.channelId === id)
);

export const getChannelsName = createSelector(
  [getChannels, getCurrentChannelId],
  (channels, id) => {
    const channelsList = Object.values(channels);
    const channel = channelsList.find((ch) => ch.id === id);
    return channel?.name;
  }
);
