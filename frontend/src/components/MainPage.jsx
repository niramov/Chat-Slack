import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import routes from '../routes/routes';
import axios from 'axios';
import getAuthHeader from '../utils/getAuthHeader';
import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { addChannels, setCurrentChannel } from '../store/chanelsSlice';
import { addMessages } from '../store/messagesSlice';
import Channels from './Channels';
import Chat from './chat/Chat';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.loggedIn === false) {
      navigate('login');
    }
    const getData = async () => {
      try {
        const headers = getAuthHeader();
        const response = await axios.get(routes.usersPath(), { headers });
        dispatch(addChannels(response.data.channels));
        dispatch(addMessages(response.data.messages));
        dispatch(setCurrentChannel(response.data.currentChannelId));
      } catch (error) {
        if (error.AxiosError) {
          toast.error(t('toast.unknown'));
        }
        if (error.response?.status === '401') {
          navigate('/');
        } else {
          toast.error(t('toast.network'));
        }
      }
    };
    getData();
  }, [dispatch]);

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
