import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentChannelMessages } from '../../store/selectors';

const MessagesList = () => {
  const messages = useSelector(getCurrentChannelMessages);
  const messageRef = useRef(null);
  const lastMessage = messages[messages.length - 1];

  useEffect(() => {
    if (lastMessage) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return (
    <div className="chat-messages overflow-auto px-5">
      {messages.map(({ username, body, id }) => (
        <div key={id} className="text-break mb-2" ref={messageRef}>
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
