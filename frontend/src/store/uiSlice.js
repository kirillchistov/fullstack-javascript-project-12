import { createSlice } from '@reduxjs/toolkit';

const defaultChannel = { id: '1', name: 'general', removable: false };

const initialState = {
  activeChannel: defaultChannel,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => ({
      ...state,
      activeChannel: action.payload,
    }),
  },
});

export const { setActiveChannel } = uiSlice.actions;

export const getCurrentActiveChannel = (state) => state.ui.activeChannel;

export default uiSlice.reducer;
