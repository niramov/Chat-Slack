import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useChatApi from '../../hooks/useChatApi';
import { getCurrentChannel } from '../../store/selectors';

const Remove = ({ hideModal, handleSuccess }) => {
  const { t } = useTranslation();
  const api = useChatApi();
  const currentChannel = useSelector(getCurrentChannel);
  const { id } = currentChannel;

  const removeChannel = () => {
    api.removeOneChannel({ id }, handleSuccess);
    toast.success(t('toast.remove'));
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>{t('modals.removeTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{t('modals.sure')}</Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            onClick={hideModal}
            variant="secondary"
            className="btn btn-primary me-2 mt-2"
          >
            {t('modals.cancellButton')}
          </Button>
          <Button
            type="submit"
            onClick={removeChannel}
            variant="danger"
            className="btn btn-primary mt-2"
          >
            {t('modals.confirmRemove')}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
