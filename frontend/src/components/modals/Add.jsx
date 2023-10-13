import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import useChatApi from '../../hooks/useChatApi';
import { getChannels } from '../../store/selectors';
import * as Yup from 'yup';

const Add = ({ hideModal }) => {
  const inputRef = useRef();
  const api = useChatApi();
  const channels = useSelector(getChannels);
  const channelsList = Object.values(channels);
  const channelsNames = channelsList.map(({ name }) => name);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const sendChannelName = (values) => {
    const channelName = { name: values.name };
    api.addNewChannel(channelName);
    hideModal();
  };

  const AddChannelSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, 'Must be longer than 1 characters')
      .max(20, 'Must be no longer than 20 characters')
      .notOneOf(channelsNames, 'Должно быть уникальным'),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: (values) => sendChannelName(values),
    validationSchema: AddChannelSchema,
  });

  const { handleChange, values, handleSubmit, errors } = formik;

  return (
    <Modal show>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>Добавить канал</Modal.Title>
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
            />
            <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
            <div className='d-flex justify-content-end'>
              <Button type='button' onClick={hideModal} variant='primary' className='btn btn-primary me-2 mt-2'>
                Отменить
              </Button>
              <Button type='submit' variant='primary' className='btn btn-primary mt-2'>
                Подтвердить
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
// написать компонент Add и другие компоненты модальных окон
