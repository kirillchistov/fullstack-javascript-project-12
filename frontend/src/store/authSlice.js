import { createSlice } from '@reduxjs/toolkit';

const storageKey = 'Hexlet Chat v1.0.0';

const getInitialState = () => {
  const storedState = localStorage.getItem(storageKey);
  return storedState ? JSON.parse(storedState) : { username: null, token: null };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setCredentials: (state, action) => {
      const { username, token } = action.payload;
      localStorage.setItem(storageKey, JSON.stringify({ username, token }));
      return { ...state, username, token };
    },
    removeCredentials: (state) => {
      localStorage.removeItem(storageKey);
      return { ...state, username: null, token: null };
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;

export const getCurrentUser = (state) => state.auth.username;
export const getCurrentToken = (state) => state.auth.token;

export default authSlice.reducer;
