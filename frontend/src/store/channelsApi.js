import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCurrentToken } from './authSlice.js';
import routes from '../routes.js';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.channelsPath(),
    prepareHeaders: (headers, { getState }) => {
      const token = getCurrentToken(getState());

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: '',
        method: 'POST',
        body: channel,
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: id,
        method: 'PATCH',
        body: patch,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
