import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../routes/routes';
import axios from 'axios';
import getAuthHeader from '../utils/getAuthHeader';
import useAuth from '../hooks/useAuth';
import { useSelector, useDispatch } from 'react-redux';
import { addChannel, addChannels } from '../store/chanelsSlice';

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
        const headers = getAuthHeader();
        const response = await axios.get(routes.usersPath(), { headers });
        dispatch(addChannels(response.data.channels));
        console.log('response chatData', response.data);
        setChatData(response);
      } catch (error) {
        console.error('Ошибка авторизации', error.message);
        navigate('login');
      }
    };
    getData();
  }, []);

  const channels = useSelector((state) => state.channels.entities);
  console.log('channels!!!', channels);

  return <div>Chat</div>;
};
export default MainPage;
