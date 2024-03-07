import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ACCOUNT_DETAILS';
export const AccountDetailAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    postChangePassword: builder?.mutation({
      query: (payload: any) => ({
        url: `${END_POINTS?.POST_CHANGE_PASSWORD}`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { usePostChangePasswordMutation } = AccountDetailAPI;
