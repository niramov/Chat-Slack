import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentChannelMessages } from '../../store/selectors';
import useChatApi from '../../hooks/useChatApi';
import { addMessage } from '../../store/messagesSlice';

const MessagesList = () => {
  const messages = useSelector(getCurrentChannelMessages);
  const dispatch = useDispatch();
  const api = useChatApi();

  useEffect(() => {
    const callback = (message) => {
      dispatch(addMessage(message));
    };

    api.socket.on('newMessage', callback);

    return () => api.socket.off('newMessage', callback);
  }, [api, dispatch]);

  return (
    <div className="chat-messages overflow-auto px-5">
      {messages.map(({ username, body, id }) => (
        <div key={id} className="text-break mb-2">
          <b>{username}</b>
          {': '}
          {body}
        </div>
      ))}
    </div>
  );
};

const Body = () => (
  <div id="messages-box" className="chat-messages overflow-auto px-5">
    <MessagesList />
  </div>
);

export default Body;
