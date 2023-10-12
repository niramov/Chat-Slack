import { useContext } from 'react';
import { ChatApiContext } from '../contexts/chatApi';

const useChatApi = () => {
  const api = useContext(ChatApiContext);
  return api;
};

export default useChatApi;
