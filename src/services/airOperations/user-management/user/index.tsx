import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'USER_LIST';
export const userManagementAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getUserList: builder?.query({
      query: ({ param }) => ({
        url: `${END_POINTS?.USER_LIST}`,
        method: 'GET',
        params: param,
      }),
      providesTags: [TAG],
    }),
    postUserList: builder?.mutation({
      query: ({ payload }) => ({
        url: `${END_POINTS?.USER_LIST}`,
        method: 'POST',
        body: payload?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { useGetUserListQuery, usePostUserListMutation } =
  userManagementAPI;
