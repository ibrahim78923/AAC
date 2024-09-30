import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ACCOUNT_DETAILS';
export const ServiceAccountDetailAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    postServiceAccountDetailChangePassword: builder?.mutation({
      query: (payload: any) => ({
        url: `${END_POINTS?.POST_CHANGE_PASSWORD}`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [TAG],
    }),
    getServiceAccountDetailProfileDetail: builder?.query({
      query: (param: any) => ({
        url: `${END_POINTS?.PROFILE_DETAIL}/${param}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    patchServiceAccountDetailProfileDetail: builder?.mutation({
      query: (param: any) => ({
        url: `${END_POINTS?.PROFILE_DETAIL}/${param?.id}`,
        method: 'PATCH',
        body: param?.body,
      }),
      invalidatesTags: [TAG],
    }),
    patchServiceAccountDetailProfileAvatar: builder?.mutation({
      query: (param: any) => ({
        url: `${END_POINTS?.PROFILE_DETAIL}/${param?.id}/avatar?removeAvatar=${param?.removeAvatar}`,
        method: 'PATCH',
        body: param?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getServiceAccountDetailCompanyAccountsById: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.POST_COMPANY_ACCOUNT}/${id}`,
        method: 'GET',
      }),
      providesTags: ['USERS'],
    }),
  }),
});

export const {
  usePostServiceAccountDetailChangePasswordMutation,
  useGetServiceAccountDetailProfileDetailQuery,
  usePatchServiceAccountDetailProfileDetailMutation,
  usePatchServiceAccountDetailProfileAvatarMutation,
  useGetServiceAccountDetailCompanyAccountsByIdQuery,
} = ServiceAccountDetailAPI;
