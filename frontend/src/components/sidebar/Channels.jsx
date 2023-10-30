import React, { useEffect } from 'react';
import { Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getChannels } from '../../store/selectors';
import useChatApi from '../../hooks/useChatApi';
import { addChannel, renameChannel, removeChannel } from '../../store/chanelsSlice';
import Modal from '../modals/index';
import { openModal, closeModal } from '../../store/modalsSlice';
import { addMessage } from '../../store/messagesSlice';
import ChannelsList from './ChannelsList';

const Channels = () => {
  const { t } = useTranslation();
  const api = useChatApi();
  const dispatch = useDispatch();
  const channelsData = useSelector(getChannels);

  const showModal = (type, id = null) => {
    dispatch(openModal({ type, id }));
  };

  const hideModal = () => {
    dispatch(closeModal());
  };

  const handleSuccess = (response) => {
    const { status } = response;
    if (status !== 'ok') {
      toast.error(t('toast.network'));
      return;
    }
    hideModal();
  };

  useEffect(() => {
    const callback = (message) => {
      console.log('recieved data', message);
      dispatch(addMessage(message));
    };

    const addCallback = (newChannel) => {
      dispatch(addChannel(newChannel));
      toast.success(t('toast.add'));
    };

    const renameCallback = ({ id, name }) => {
      dispatch(renameChannel({ id, changes: { name } }));
      toast.success(t('toast.rename'));
    };

    const removeCallback = (data) => {
      dispatch(removeChannel(data.id));
      toast.success(t('toast.remove'));
    };

    api.socket.on('newMessage', callback);
    api.socket.on('newChannel', addCallback);
    api.socket.on('renameChannel', renameCallback);
    api.socket.on('removeChannel', removeCallback);

    return () => {
      api.socket.off('newMessage', callback);
      api.socket.off('newChannel', addCallback);
      api.socket.off('renameChannel', renameCallback);
      api.socket.off('removeChannel', removeCallback);
    };
  }, [api, dispatch, t]);

  return (
    <Col className="col-4 col-md-3 border-end px-0 bg-light flex-column d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channel.channels')}</b>
        <Button
          onClick={() => showModal('adding')}
          variant="link"
          className="p-0 text-primary btn-group-vertical text-decoration-none"
        >
          +
        </Button>
      </div>
      <ChannelsList showModal={showModal} channelsData={channelsData} />
      <Modal hideModal={hideModal} handleSuccess={handleSuccess} />
    </Col>
  );
};

export default Channels;
