import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId === null) {
      navigate('/login');
    }
  });

  return <div>Страница чата</div>;
};
export default MainPage;
