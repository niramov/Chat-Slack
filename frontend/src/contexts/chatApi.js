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
  setCurrentChannel,
} from '../store/chanelsSlice';

export const ChatApiContext = createContext();

const ChatContextProvider = ({ children }) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   socket.on('newMessage', (newMessage) => {
  //     dispatch(addMessage(newMessage));
  //   });
  //   socket.on('newChannel', (newChannel) => {
  //     dispatch(addChannel(newChannel));
  //   });
  //   socket.on('renameChannel', ({ id, name }) => {
  //     dispatch(renameChannel({ id, changes: { name } }));
  //   });
  //   socket.on('removeChannel', (data) => {
  //     dispatch(setDefaultChannel(data.id));
  //     dispatch(removeChannel(data.id));
  //   });

  //   return () => {
  //     socket.off('newMessage');
  //     socket.off('newChannel');
  //     socket.off('renameChannel');
  //     socket.off('removeChannel');
  //   };
  // }, [socket, dispatch]);

  const value = useMemo(() => {
    const addNewMessageListener = (callback) => {
      socket.on('newMessage', callback);
    };

    const addNewChannelListener = (callback) => {
      socket.on('newChannel', callback);
    };

    const addRenameChannelListener = (callback) => {
      socket.on('renameChannel', callback);
    };

    const addRemoveChannelListener = (callback) => {
      socket.on('removeChannel', callback);
    };

    const removeNewMessageListener = (callback) => {
      socket.off('newMessage', callback);
    };

    const removeNewChannelListener = (callback) => {
      socket.off('newChannel', callback);
    };

    const removeRenameChannelListener = (callback) => {
      socket.off('renameChannel', callback);
    };

    const removeRemoveChannelListener = (callback) => {
      socket.off('removeChannel', callback);
    };

    const addNewMessage = (message) => {
      socket.emit('newMessage', message);
    };

    const addNewChannel = (channel, cb) => {
      socket.emit('newChannel', channel, (response) => {
        const { status, data: { id } } = response;
        if (status === 'ok') {
          dispatch(setCurrentChannel(id));
          cb();
        };
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
        };
      });
    };

    return {
      addNewMessageListener,
      addNewChannelListener,
      addRenameChannelListener,
      addRemoveChannelListener,
      removeNewMessageListener,
      removeNewChannelListener,
      removeRenameChannelListener,
      removeRemoveChannelListener,
      addNewMessage,
      addNewChannel,
      renameOneChannel,
      removeOneChannel,
    };
  }, [socket, dispatch]);

  return <ChatApiContext.Provider value={value}>{children}</ChatApiContext.Provider>;
};

export default ChatContextProvider;
