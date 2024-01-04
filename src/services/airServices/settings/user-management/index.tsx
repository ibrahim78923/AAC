import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'REQUESTERS';
export const userManagementRequesterAPI = baseAPI.injectEndpoints({
  endpoints: (builder: any) => ({
    getRequestersList: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.REQUESTER_LIST}`,
        method: 'GET',
        params,
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
    getViewRequestersDetails: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.REQUESTER_VIEW_DETAILS}${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    postAddRequester: builder.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.ADD_REQUESTER}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    patchRequester: builder.mutation({
      query: ({ _id, body }: { _id: any; body: any }) => ({
        url: `${END_POINTS?.EDIT_REQUESTER}/${_id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetRequestersListQuery,
  useDeleteRequesterMutation,
  useGetViewRequestersDetailsQuery,
  usePostAddRequesterMutation,
  usePatchRequesterMutation,
} = userManagementRequesterAPI;
