import React, {
  createContext,
  useContext,
  useMemo,
} from 'react';
import SocketContext from './socketContext';

export const ChatApiContext = createContext();

const ChatContextProvider = ({ children }) => {
  const socket = useContext(SocketContext);

  const value = useMemo(() => {
    const addNewMessage = (message, cb, resetForm) => {
      socket.emit('newMessage', message, (response) => {
        cb(response, resetForm);
      });
    };

    const addNewChannel = (channel, cb) => {
      socket.emit('newChannel', channel, (response) => {
        cb(response);
      });
    };

    const renameOneChannel = (channel, cb) => {
      socket.emit('renameChannel', channel, (response) => {
        cb(response);
      });
    };

    const removeOneChannel = (channel, cb) => {
      socket.emit('removeChannel', { id: channel.id }, (response) => {
        cb(response);
      });
    };

    return {
      addNewMessage,
      addNewChannel,
      renameOneChannel,
      removeOneChannel,
      socket,
    };
  }, [socket]);

  return <ChatApiContext.Provider value={value}>{children}</ChatApiContext.Provider>;
};

export default ChatContextProvider;
