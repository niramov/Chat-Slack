import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Button, InputGroup } from 'react-bootstrap';
import filter from 'leo-profanity';
import { useFormik } from 'formik';
import { getCurrentChannelId } from '../../store/selectors';
import useAuth from '../../hooks/useAuth';
import useChatApi from '../../hooks/useChatApi';

const SendMessageForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const api = useChatApi();
  const auth = useAuth();
  const username = auth.getUserName();
  const channelId = useSelector(getCurrentChannelId);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: ({ message }, { resetForm }) => {
      if (message) {
        const data = {
          body: filter.clean(message),
          channelId,
          username,
        };
        api.addNewMessage(data);
        resetForm();
        inputRef.current.focus();
      }
    },
  });

  const { handleSubmit, handleChange, values } = formik;

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={handleSubmit}>
        <InputGroup className="mb-0">
          <Form.Control
            type="text"
            placeholder={t('messages.placeholder')}
            className="border-0 p-0 ps-1"
            aria-label={t('messages.newMessage')}
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            ref={inputRef}
          />
          <Button
            variant="group-vertical"
            id="sendMessageButton"
            type="submit"
            className="btn-group-vertical "
          >
            {t('messages.send')}
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default SendMessageForm;
