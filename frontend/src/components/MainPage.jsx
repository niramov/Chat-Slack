import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import Channels from './sidebar/Channels';
import Chat from './chat/Chat';
import { getChatData, getError } from '../store/chanelsSlice';
import routes from '../routes/routes';

const MainPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useDispatch();
  const headers = auth.getAuthHeader();
  const error = useSelector(getError);

  useEffect(() => {
    if (error) {
      console.log('ERRORRR', error);
      auth.logOut();
      navigate(routes.login());
    }
    dispatch(getChatData(headers));
  }, [dispatch, t, navigate, auth, headers, error]);

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
