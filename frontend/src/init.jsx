import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import App from './components/App.jsx';
import store from './store/index.js';
import { messagesApi } from './store/messagesApi.js';
import { setConnectionStatus } from './store/uiSlice.js';

const initSocket = () => {
  const socket = io();

  socket.on('connect', () => {
    store.dispatch(setConnectionStatus('online'));
  });

  socket.on('disconnect', () => {
    store.dispatch(setConnectionStatus('offline'));
  });

  socket.on('newMessage', (message) => {
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
      const exists = draft.some((item) => item.id === message.id);

      if (!exists) {
        draft.push(message);
      }
    }));
  });

  return socket;
};

const init = () => {
  initSocket();

  return (
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
};

export default init;
