import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'REQUESTERS';
export const userManagementRequesterAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getRequestersList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.REQUESTER_LIST}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),

    deleteRequester: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.DELETE_REQUESTER}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getViewRequestersDetails: builder?.query({
      query: (id: any) => ({
        url: `${END_POINTS?.REQUESTER_VIEW_DETAILS}${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    postAddRequester: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.ADD_REQUESTER}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    patchRequester: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.EDIT_REQUESTER}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    convertToAgent: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.CONVERT_TO_AGENT,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
  }),
});

export const {
  useGetRequestersListQuery,
  useDeleteRequesterMutation,
  useGetViewRequestersDetailsQuery,
  usePostAddRequesterMutation,
  usePatchRequesterMutation,
  useLazyGetRequestersListQuery,
  useConvertToAgentMutation,
} = userManagementRequesterAPI;
