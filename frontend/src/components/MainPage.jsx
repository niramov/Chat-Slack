import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../routes/routes';
import axios from 'axios';
import getAuthHeader from '../utils/getAuthHeader';

const MainPage = () => {
  const [chatData, setChatData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId === null) {
      navigate('/login');
    }
    const getData = async () => {
      try {
        const headers = getAuthHeader();
        const response = await axios.get(routes.usersPath(), { headers });
        setChatData(response);
      } catch (error) {
        console.error('Ошибка авторизации', error);
      }
    };
    getData();
    console.log('chatData', chatData);
  });

  return <div>Страница чата</div>;
};
export default MainPage;
