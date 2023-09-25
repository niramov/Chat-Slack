import React from 'react';
import { getChannelsName, getCurrentChannelMessages } from '../../store/selectors';
import { useSelector } from 'react-redux';

const Header = () => {
  const currentChannelName = useSelector(getChannelsName);
  const count = useSelector(getCurrentChannelMessages);
  console.log('count', count);
  return (
    <div className='bg-light mb-4 p-3 shadow-sm small"'>
      <p className='m-0'>
        <b># {currentChannelName}</b>
      </p>
      <span className='text-muted'> {count} Сообщений</span>
    </div>
  );
};

export default Header;
