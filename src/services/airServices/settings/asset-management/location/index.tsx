import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'LOCATION';
const { ADD_LOCATION, GET_LOCATION } = END_POINTS;
export const locationAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getAddLocation: builder.query({
      query: () => ({
        url: `${GET_LOCATION}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    postAddLocation: builder.mutation({
      query: (body: any) => ({
        url: `${ADD_LOCATION}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { usePostAddLocationMutation, useGetAddLocationQuery } =
  locationAPI;
