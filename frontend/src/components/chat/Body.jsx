import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentChannelMessages } from '../../store/selectors';

const MessagesList = () => {
  const messages = useSelector(getCurrentChannelMessages);

  return (
    <div className='chat-messages overflow-auto px-5'>
      {messages.map(({ username, body, channelId, id }) => {
        return (
          <div key={id} className='text-break mb-2'>
            <b>{username}</b>: {body}
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

// 1. Берем из стейта сообщения, которые отностяся к выбранному каналу.
// 2. Загружаем эти сообщения с помощью map, где пишем author:
