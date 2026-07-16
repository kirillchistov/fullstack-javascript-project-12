import i18next from 'i18next';
import { StrictMode } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { ToastContainer, Slide } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/App.jsx';
import { FilterProvider } from './contexts/FilterContext.jsx';
import resources from './locales/index.js';
import store from './store/index.js';
import { channelsApi } from './store/channelsApi.js';
import { messagesApi } from './store/messagesApi.js';
import {
  getCurrentActiveChannel,
  getCurrentDefaultChannel,
  setActiveChannel,
  setConnectionStatus,
} from './store/uiSlice.js';

const initSocket = (i18n) => {
  const socket = io();

  socket.on('connect', () => {
    store.dispatch(setConnectionStatus('online'));
  });

  socket.on('disconnect', () => {
    store.dispatch(setConnectionStatus('offline'));
    toast.error(i18n.t('toast.errorNetwork'));
  });

  socket.on('newMessage', (message) => {
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
      const exists = draft.some((item) => item.id === message.id);

      if (!exists) {
        draft.push(message);
      }
    }));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
      const exists = draft.some((item) => item.id === channel.id);

      if (!exists) {
        draft.push(channel);
      }
    }));
  });

  socket.on('removeChannel', (channel) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
      const index = draft.findIndex((item) => item.id === channel.id);

      if (index !== -1) {
        draft.splice(index, 1);
      }
    }));

    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => (
      draft.filter((message) => message.channelId !== channel.id)
    )));

    const activeChannel = getCurrentActiveChannel(store.getState());

    if (channel.id === activeChannel?.id) {
      const defaultChannel = getCurrentDefaultChannel(store.getState());
      store.dispatch(setActiveChannel(defaultChannel));
    }
  });

  socket.on('renameChannel', (channel) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
      const currentChannel = draft.find((item) => item.id === channel.id);

      if (currentChannel) {
        currentChannel.name = channel.name;
      }
    }));

    const activeChannel = getCurrentActiveChannel(store.getState());

    if (channel.id === activeChannel?.id) {
      store.dispatch(setActiveChannel({ ...activeChannel, name: channel.name }));
    }
  });

  return socket;
};

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  initSocket(i18n);

  return (
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <FilterProvider>
            <App />
            <ToastContainer
              transition={Slide}
              autoClose={5000}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </FilterProvider>
        </Provider>
      </I18nextProvider>
    </StrictMode>
  );
};

export default init;
