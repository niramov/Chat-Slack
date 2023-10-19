import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import SocketContext from './socketContext';
import { addMessage } from '../store/messagesSlice';
import {
  addChannel,
  removeChannel,
  renameChannel,
  setDefaultChannel,
} from '../store/chanelsSlice';

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
    socket.on('renameChannel', ({ id, name }) => {
      dispatch(renameChannel({ id, changes: { name } }));
    });
    socket.on('removeChannel', (data) => {
      dispatch(setDefaultChannel(data.id));
      dispatch(removeChannel(data.id));
    });
  }, [socket, dispatch]);

  const value = useMemo(() => {
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

    return {
      addNewMessage,
      addNewChannel,
      renameOneChannel,
      removeOneChannel,
    };
  }, [socket]);

  return <ChatApiContext.Provider value={value}>{children}</ChatApiContext.Provider>;
};

export default ChatContextProvider;
