import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import routes from '../routes/routes';
import getAuthHeader from '../utils/getAuthHeader';
import useAuth from '../hooks/useAuth';
import { addChannels, setCurrentChannel } from '../store/chanelsSlice';
import { addMessages } from '../store/messagesSlice';
import Channels from './sidebar/Channels';
import Chat from './chat/Chat';
import { getChatData, getError } from '../store/chanelsSlice';

const MainPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useDispatch();
  const error = useSelector(getError);
  console.log('error',error);

  useEffect(() => {
    dispatch(getChatData());

  //   if (error) {
  //     if (error?.AxiosError) {
  //       toast.error(t('toast.unknown'));
  //     }
  //     if (error.response?.status === '401') {
  //       auth.logOut();
  //       navigate(routes.login());
  //    } else {
  //       toast.error(t('toast.network'));
  //   }
  // }
  }, [error, dispatch, t, navigate, auth]);

  return (
    <Container className="container vh-100 rounded shadow">
      <Row className="row h-100 bg-white flex-md-row">
        <Channels />
        <Chat />
      </Row>
    </Container>
  );
};
export default MainPage;
