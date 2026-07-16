import { createSlice } from '@reduxjs/toolkit';

const defaultChannel = { id: '1', name: 'general', removable: false };

const initialState = {
  activeChannel: defaultChannel,
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
    setConnectionStatus: (state, action) => ({
      ...state,
      connectionStatus: action.payload,
    }),
  },
});

export const { setActiveChannel, setConnectionStatus } = uiSlice.actions;

export const getCurrentActiveChannel = (state) => state.ui.activeChannel;
export const getConnectionStatus = (state) => state.ui.connectionStatus;

export default uiSlice.reducer;
