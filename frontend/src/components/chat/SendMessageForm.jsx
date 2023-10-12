import React, { useEffect, useContext, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentChannelId } from '../../store/selectors';
import { Form, Button, InputGroup } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import useChatApi from '../../hooks/useChatApi';

const SendMessageForm = () => {
  const [inputData, setInputData] = useState('');
  const inputRef = useRef(null);
  const api = useChatApi();
  const auth = useAuth();
  const username = auth.getUserName();
  const currentChannelId = useSelector(getCurrentChannelId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputData !== '') {
      const data = {
        body: inputData,
        channelId: currentChannelId,
        username,
      };
      api.addNewMessage(data);
      setInputData('');
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className='mt-auto px-5 py-3'>
      <Form className='py-1 border rounded-2' onSubmit={handleSubmit}>
        <InputGroup className='mb-0'>
          <Form.Control
            placeholder='Введите сообщение'
            className='border-0 p-0 ps-1'
            aria-label='Send message'
            aria-describedby='basic-addon2'
            name='inputField'
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            ref={inputRef}
          />
          <Button variant='group-vertical' id='sendMessageButton' type='submit' className='btn-group-vertical '>
            Отправить
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default SendMessageForm;
