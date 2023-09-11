import React from 'react';

const ErrorPage = () => {
  return (
    <div className='text-center'>
      <h4 className='h4'>Такой страницы не существует</h4>
      <p>
        <a href='/login'>Залогиниться</a>
      </p>
    </div>
  );
};

export default ErrorPage;
