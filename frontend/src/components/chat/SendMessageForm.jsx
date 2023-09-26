import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const SendMessageForm = () => {
  return (
    <div className='mt-auto px-5 py-3'>
      <Form className='py-1 border rounded-2' /*onSubmit={handleSubmit} */>
        <InputGroup className='mb-0'>
          <Form.Control
            placeholder='Введите сообщение'
            className='border-0 p-0 ps-1'
            aria-label='Send message'
            aria-describedby='basic-addon2'
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
