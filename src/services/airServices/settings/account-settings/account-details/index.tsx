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
    getProfileDetail: builder?.query({
      query: (param: any) => ({
        url: `${END_POINTS?.GET_PROFILE_DETAIL}/${param}`,
        method: 'GET',
        // params: param,
      }),
      providesTags: [TAG],
    }),
    patchProfileDetail: builder?.mutation({
      query: (param: any) => ({
        url: `${END_POINTS?.PATCH_PROFILE_DETAIL}`,
        method: 'PATCH',
        params: param?.id,
        body: param?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  usePostChangePasswordMutation,
  useGetProfileDetailQuery,
  usePatchProfileDetailMutation,
} = AccountDetailAPI;
