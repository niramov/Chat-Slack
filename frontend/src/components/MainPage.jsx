import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../routes/routes';
import axios from 'axios';
import getAuthHeader from '../utils/getAuthHeader';
import useAuth from '../hooks/useAuth';
import { useSelector, useDispatch } from 'react-redux';
import { addChannels } from '../store/chanelsSlice';
import { addMessages } from '../store/messagesSlice';
import Channels from './Channels';
import Header from './chat/Header';

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
        dispatch(addMessages(response.data.messages));
        setChatData(response);
      } catch (error) {
        console.error('Ошибка авторизации', error.message);
        navigate('login');
      }
    };
    getData();
  }, []);

  const channels = useSelector((state) => Object.values(state.channels.entities));

  return (
    <div>
      {/* Chat */}
      <Channels />
      <div className='flex-grow-1'>
        <Header />
      </div>
    </div>
  );
};
export default MainPage;
