import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { io } from 'socket.io-client';
import init from './init';

// const rollbarConfig = {
//   accessToken: process.env.REACT_APP_ROLLBAR,
//   environment: 'production',
// };

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider config={rollbarConfig}>
//       <ErrorBoundary>
//         <App />
//       </ErrorBoundary>
//     </Provider>
//   </React.StrictMode>,
// );

const app = async () => {
  const socket = io();
  const vdom = await init(socket);
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<React.StrictMode>{vdom}</React.StrictMode>);
};

app();
