import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import routes from '../routes/routes';
import axios from 'axios';
import getAuthHeader from '../utils/getAuthHeader';
import useAuth from '../hooks/useAuth';
import { useSelector, useDispatch } from 'react-redux';
import { addChannels } from '../store/chanelsSlice';
import { addMessages } from '../store/messagesSlice';
import Channels from './Channels';
import Chat from './chat/Chat';

const MainPage = () => {
  const [chatData, setChatData] = useState(null);
  const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.loggedIn === false) {
      navigate('login');
    }
    const getData = async () => {
      try {
        console.log('fetching!!!!');
        const headers = getAuthHeader();
        const response = await axios.get(routes.usersPath(), { headers });
        console.log('response', response.data);
        dispatch(addChannels(response.data.channels));
        dispatch(addMessages(response.data.messages));
        setChatData(response);
      } catch (error) {
        console.error('Ошибка авторизации', error.message);
        navigate('login');
      }
    };
    getData();
  }, []);

  return (
    <Container className='container vh-100 rounded shadow'>
      <Row className='row h-100 bg-white flex-md-row'>
        <Channels />
        <Chat />
      </Row>
    </Container>
  );
};
export default MainPage;

//vh-100 my-0 overflow-hidden rounded shadow
// row h-100 bg-white flex-md-row
