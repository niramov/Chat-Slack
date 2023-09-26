import Reac from 'react';
import Header from './Header';
import Body from './Body';
import SendMessageForm from './SendMessageForm';

const Chat = () => {
  return (
    <div className='col p-0 h-100 overflow-auto'>
      <div className='d-flex flex-column h-100'>
        <Header />
        <Body />
        <SendMessageForm />
      </div>
    </div>
  );
};
export default Chat;
