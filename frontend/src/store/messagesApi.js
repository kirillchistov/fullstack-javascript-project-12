import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCurrentToken } from './authSlice.js';
import routes from '../routes.js';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.messagesPath(),
    prepareHeaders: (headers, { getState }) => {
      const token = getCurrentToken(getState());

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: '',
        method: 'POST',
        body: message,
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messagesApi;
