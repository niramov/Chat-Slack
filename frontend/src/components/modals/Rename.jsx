import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import useChatApi from '../../hooks/useChatApi';
import { getChannels } from '../../store/selectors';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Rename = ({ hideModal, modalInfo }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const api = useChatApi();
  const channels = useSelector(getChannels);
  const channelsList = Object.values(channels);
  const channelsNames = channelsList.map(({ name }) => name);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const renameChannel = (values) => {
    const channel = { name: values.name, id: modalInfo.item.id };
    console.log('channelName!!!', channel);
    api.renameOneChannel(channel);
    hideModal();
    toast.success(t('toast.rename'));
  };

  const RenameSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, t('modals.minName'))
      .max(20, t('modals.maxName'))
      .notOneOf(channelsNames, t('modals.uniq')),
  });

  const formik = useFormik({
    initialValues: { name: modalInfo.item.name },
    onSubmit: (values) => renameChannel(values),
    validationSchema: RenameSchema,
  });

  const { handleChange, values, handleSubmit, errors } = formik;

  return (
    <Modal show>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>{t('modals.renameTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              onChange={handleChange}
              value={values.name}
              isInvalid={!!errors.name}
              name='name'
              type='text'
              id={t('modals.modalName')}
            />
            <Form.Label className='visually-hidden' htmlFor='name'>
              {/* {t('modals.modalName')} */}
            </Form.Label>
            <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
            <div className='d-flex justify-content-end'>
              <Button type='button' onClick={hideModal} variant='secondary' className='btn btn-primary me-2 mt-2'>
                {t('modals.cancellButton')}
              </Button>
              <Button type='submit' variant='primary' className='btn btn-primary mt-2'>
                {t('modals.confirmButton')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
