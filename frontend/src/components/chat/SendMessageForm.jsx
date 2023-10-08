import React, { useEffect, useContext, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentChannelId } from '../../store/selectors';
import { Form, Button, InputGroup } from 'react-bootstrap';
import SocketContext from '../../contexts/socketContext';
import useAuth from '../../hooks/useAuth';
import { MessagesContext } from '../../contexts/messagesContext';

const SendMessageForm = () => {
  const [inputData, setInputData] = useState('');
  const inputRef = useRef(null);
  const socket = useContext(SocketContext);
  const sendMessage = useContext(MessagesContext);
  const auth = useAuth();
  const username = auth.getUserName();
  const currentChannelId = useSelector(getCurrentChannelId);

  // Добавить хэндлер с отправкой сообщения
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputData !== '') {
      const data = {
        body: inputData,
        channelId: currentChannelId,
        username,
      };
      sendMessage(data);
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
