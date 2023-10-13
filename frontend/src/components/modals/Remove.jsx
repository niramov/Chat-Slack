import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import useChatApi from '../../hooks/useChatApi';

const Rename = ({ hideModal, modalInfo }) => {
  console.log('modalInfo.item.id ', modalInfo.item.id);
  const api = useChatApi();

  const removeChannel = () => {
    api.removeOneChannel({ id: modalInfo.item.id });
    hideModal();
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>Уверены?</Modal.Body>
      <Modal.Footer>
        <div className='d-flex justify-content-end'>
          <Button type='button' onClick={hideModal} variant='primary' className='btn btn-primary me-2 mt-2'>
            Отменить
          </Button>
          <Button type='submit' onClick={removeChannel} variant='primary' className='btn btn-primary mt-2'>
            Удалить
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Rename;
