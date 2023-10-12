import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SocketContext from './socketContext';
import { addMessage } from '../store/messagesSlice';
import { addChannel } from '../store/chanelsSlice';

export const ChatApiContext = createContext();

const ChatContextProvider = ({ children }) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      console.log('newMessage', newMessage);
      dispatch(addMessage(newMessage));
    });
    socket.on('newChannel', (newChannel) => {
      console.log('newChannel', newChannel);
      dispatch(addChannel(newChannel));
    });
  }, [socket]);

  const addNewMessage = (message) => {
    socket.emit('newMessage', message);
  };

  const addNewChannel = (channel) => {
    socket.emit('newChannel', channel);
  };

  const value = { addNewMessage, addNewChannel };

  return <ChatApiContext.Provider value={value}>{children}</ChatApiContext.Provider>;
};

export default ChatContextProvider;
