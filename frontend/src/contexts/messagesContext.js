import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SocketContext from './socketContext';
import { addMessage } from '../store/messagesSlice';

const MessagesContext = createContext();

const MessagesContextProvider = ({ children }) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      console.log('newMessage', newMessage);
      dispatch(addMessage(newMessage));
    });
  }, [socket]);

  const addNewMessage = (message) => {
    socket.emit('newMessage', message);
  };

  return <MessagesContext.Provider value={addNewMessage}>{children}</MessagesContext.Provider>;
};

export { MessagesContext, MessagesContextProvider };
