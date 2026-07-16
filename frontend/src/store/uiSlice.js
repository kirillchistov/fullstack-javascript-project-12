import { createSlice } from '@reduxjs/toolkit';

const defaultChannel = { id: '1', name: 'general', removable: false };

const initialState = {
  activeChannel: defaultChannel,
  defaultChannel,
  modalChannel: { type: null, channel: null },
  connectionStatus: 'online',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => ({
      ...state,
      activeChannel: action.payload,
    }),
    setDefaultChannel: (state, action) => ({
      ...state,
      defaultChannel: action.payload,
    }),
    setModalChannel: (state, action) => ({
      ...state,
      modalChannel: action.payload,
    }),
    setConnectionStatus: (state, action) => ({
      ...state,
      connectionStatus: action.payload,
    }),
  },
});

export const {
  setActiveChannel,
  setDefaultChannel,
  setModalChannel,
  setConnectionStatus,
} = uiSlice.actions;

export const getCurrentActiveChannel = (state) => state.ui.activeChannel;
export const getCurrentDefaultChannel = (state) => state.ui.defaultChannel;
export const getCurrentModalChannel = (state) => state.ui.modalChannel;
export const getConnectionStatus = (state) => state.ui.connectionStatus;

export default uiSlice.reducer;
