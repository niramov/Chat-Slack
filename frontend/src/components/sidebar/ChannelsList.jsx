import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { getCurrentChannelId } from '../../store/selectors';
import { setCurrentChannel } from '../../store/chanelsSlice';

const ChannelsList = ({ channelsData, showModal }) => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(getCurrentChannelId);
  const channels = Object.values(channelsData);
  const dispatch = useDispatch();

  return (
    <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map(({ name, id, removable }) => {
        const btnClasses = cn('btn', {
          'btn-secondary': currentChannelId === id,
        });
        const variant = currentChannelId === id ? 'secondary' : 'light';
        if (!removable) {
          return (
            <li className="nav-item w-100" key={id}>
              <button
                type="button"
                onClick={() => dispatch(setCurrentChannel(id))}
                className={`w-100 rounded-0 text-start ${btnClasses}`}
              >
                # {name}
              </button>
            </li>
          );
        }

        return (
          <li key={id}>
            <div role="group" className="d-flex dropdown btn-group">
              <Dropdown as={ButtonGroup} className="w-100">
                <Button
                  variant={variant}
                  className="text-start w-100 tet-truncate"
                  onClick={() => {
                    dispatch(setCurrentChannel(id));
                  }}
                >
                  # {name}
                </Button>
                <Dropdown.Toggle split variant={variant} className="flex-grow-0 text-end">
                  <span className="visually-hidden">{t('channel.channelManagement')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => showModal('removing', id)}>
                    {t('channel.delete')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => showModal('renaming', id)}>
                    {t('channel.rename')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ChannelsList;
