import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const DELEGATE_DASHBOARD = 'delegate-dashboard';

export const ActivityLogAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDelegateDashboardData: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.GET_DELEGATE_DASHBOARD,
        method: 'GET',
        params: params,
      }),
      providesTags: [DELEGATE_DASHBOARD],
    }),
    postDelegateUserInvite: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.POST_DELEGATE_USER_INVITE,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [DELEGATE_DASHBOARD],
    }),
  }),
});

export const {
  useGetDelegateDashboardDataQuery,
  usePostDelegateUserInviteMutation,
} = ActivityLogAPI;
