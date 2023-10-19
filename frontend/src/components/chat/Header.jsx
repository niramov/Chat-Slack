import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getChannelsName, getCurrentChannelMessages } from '../../store/selectors';

const Header = () => {
  const { t } = useTranslation();
  const currentChannelName = useSelector(getChannelsName);
  const count = useSelector(getCurrentChannelMessages);
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {' '}
          {currentChannelName}
        </b>
      </p>
      <span className="text-muted">
        {t('messages.message', { count: count.length })}
      </span>
    </div>
  );
};

export default Header;
