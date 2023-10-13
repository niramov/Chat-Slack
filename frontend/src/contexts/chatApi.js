import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SocketContext from './socketContext';
import { addMessage } from '../store/messagesSlice';
import { addChannel, removeChannel, renameChannel } from '../store/chanelsSlice';

export const ChatApiContext = createContext();
// написать удаление сообщений выбранного канала через extraReducеrs
// и перенесение пользователей в дефолтный канал
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
    socket.on('renameChannel', ({ id, name }) => {
      dispatch(renameChannel({ id, changes: { name } }));
    });
    socket.on('removeChannel', (data) => {
      dispatch(removeChannel(data.id));
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

  const removeOneChannel = (channel) => {
    socket.emit('removeChannel', { id: channel.id });
  };

  const value = { addNewMessage, addNewChannel, renameOneChannel, removeOneChannel };

  return <ChatApiContext.Provider value={value}>{children}</ChatApiContext.Provider>;
};

export default ChatContextProvider;
