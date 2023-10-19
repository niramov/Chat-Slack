/* eslint-disable react/prop-types */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useChatApi from '../../hooks/useChatApi';

// eslint-disable-next-line no-shadow
const Rename = ({ hideModal, modalInfo }) => {
  const { t } = useTranslation();
  const api = useChatApi();

  const removeChannel = () => {
    api.removeOneChannel({ id: modalInfo.item.id });
    hideModal();
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

export default Rename;
