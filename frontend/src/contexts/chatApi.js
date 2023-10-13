import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SocketContext from './socketContext';
import { addMessage } from '../store/messagesSlice';
import { addChannel, renameChannel } from '../store/chanelsSlice';

export const ChatApiContext = createContext();

const ChatContextProvider = ({ children }) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      dispatch(addMessage(newMessage));
    });
    socket.on('newChannel', (newChannel) => {
      dispatch(addChannel(newChannel));
    });
    socket.on('renameChannel', (channel) => {
      console.log('renamedChannel', channel);
      dispatch(renameChannel(channel));
    });
  }, [socket]);

  const addNewMessage = (message) => {
    socket.emit('newMessage', message);
  };

  const addNewChannel = (channel) => {
    socket.emit('newChannel', channel);
  };
  const renameOneChannel = (channel) => {
    socket.emit('renameChannel', channel);
  };

  const value = { addNewMessage, addNewChannel, renameOneChannel };

  return <ChatApiContext.Provider value={value}>{children}</ChatApiContext.Provider>;
};

export default ChatContextProvider;
