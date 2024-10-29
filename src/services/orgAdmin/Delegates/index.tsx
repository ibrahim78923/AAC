import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI, TAGS } from '@/services/base-api';

export const ActivityLogAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDelegateDashboardData: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.GET_DELEGATE_DASHBOARD,
        method: 'GET',
        params: params,
      }),
      providesTags: TAGS,
    }),
    postDelegateUserInvite: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.POST_DELEGATE_USER_INVITE,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAGS,
    }),
  }),
});

export const {
  useGetDelegateDashboardDataQuery,
  usePostDelegateUserInviteMutation,
} = ActivityLogAPI;
