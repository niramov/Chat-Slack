import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../routes/routes';
import axios from 'axios';
import getAuthHeader from '../utils/getAuthHeader';
import useAuth from '../hooks/useAuth';

const MainPage = () => {
  const [chatData, setChatData] = useState(null);
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    // if (auth.loggedIn === false) {
    //   navigate('login');
    // }
    const getData = async () => {
      try {
        const headers = getAuthHeader();
        const response = await axios.get(routes.usersPath(), { headers });
        console.log('response chatData', response.data);
        setChatData(response);
      } catch (error) {
        console.error('Ошибка авторизации', error);
        navigate('login');
      }
    };
    getData();
  }, []);

  return <div>Chat</div>;
};
export default MainPage;
