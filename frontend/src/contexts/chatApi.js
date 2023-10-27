import React, {
  createContext,
  useContext,
  useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import SocketContext from './socketContext';
import { setCurrentChannel } from '../store/chanelsSlice';

export const ChatApiContext = createContext();

const ChatContextProvider = ({ children }) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const value = useMemo(() => {
    const addNewMessage = (message, cb) => {
      socket.emit('newMessage', message, (response) => {
        cb(response);
      })
    };

    const addNewChannel = (channel, cb) => {
      socket.emit('newChannel', channel, (response) => {
        const { status, data: { id } } = response;
        if (status === 'ok') {
          dispatch(setCurrentChannel(id));
          cb();
        }
      });
    };

    const renameOneChannel = (channel, cb) => {
      socket.emit('renameChannel', channel, (response) => {
        const { status } = response;
        if (status === 'ok') {
          cb();
        }
      });
    };

    const removeOneChannel = (channel, cb) => {
      socket.emit('removeChannel', { id: channel.id }, (response) => {
        const { status } = response;
        if (status === 'ok') {
          cb();
        }
      });
    };

    return {
      addNewMessage,
      addNewChannel,
      renameOneChannel,
      removeOneChannel,
      socket,
    };
  }, [socket, dispatch]);

  return <ChatApiContext.Provider value={value}>{children}</ChatApiContext.Provider>;
};

export default ChatContextProvider;
