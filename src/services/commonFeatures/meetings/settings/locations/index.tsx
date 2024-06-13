import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'MEETINGS_LOCATIONS';

export const meetingsLocationApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCommonMeetingsLocationsList: builder.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.GET_MEETINGS_LOCATIONS}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    postCommonMeetingsLocations: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ADD_MEETINGS_LOCATIONS}`,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    patchCommonMeetingsLocations: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.UPDATE_MEETINGS_LOCATIONS}`,
        method: 'PUT',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteCommonMeetingsLocations: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.DELETE_MEETINGS_LOCATIONS}`,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
  }),
});

export const {
  useLazyGetCommonMeetingsLocationsListQuery,
  useDeleteCommonMeetingsLocationsMutation,
  usePatchCommonMeetingsLocationsMutation,
  usePostCommonMeetingsLocationsMutation,
} = meetingsLocationApi;
