import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentChannelMessages } from '../../store/selectors';

const MessagesList = () => {
  const messages = useSelector(getCurrentChannelMessages);

  return (
    <div className='chat-messages overflow-auto px-5'>
      {messages.map(({ username, body, id }) => {
        return (
          <div key={id} className='text-break mb-2'>
            <b>{username}</b>
            {': '}
            {body}
          </div>
        );
      })}
    </div>
  );
};

const Body = () => {
  return (
    <div id='messages-box' className='chat-messages overflow-auto px-5'>
      <MessagesList />
    </div>
  );
};
export default Body;
