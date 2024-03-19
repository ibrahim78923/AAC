import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'USER_LIST';
export const userManagementAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getProductUserList: builder?.query({
      query: ({ param }) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}`,
        method: 'GET',
        params: param,
      }),
      providesTags: [TAG],
    }),
    postProductUserList: builder?.mutation({
      query: (postAnnouncementParameter: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}`,
        method: 'POST',
        body: postAnnouncementParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { useGetProductUserListQuery, usePostProductUserListMutation } =
  userManagementAPI;
