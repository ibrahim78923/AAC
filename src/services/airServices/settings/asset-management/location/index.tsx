import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'LOCATION';
const { ADD_LOCATION, GET_LOCATION, ADD_CHILD_LOCATION, PUT_LOCATION } =
  END_POINTS;
export const locationAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getLocation: builder.query({
      query: () => ({
        url: `${GET_LOCATION}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    postLocation: builder.mutation({
      query: (body: any) => ({
        url: `${ADD_LOCATION}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    postChildLocation: builder.mutation({
      query: (postChildLocationParameter: any) => ({
        url: `${ADD_CHILD_LOCATION}?id=${postChildLocationParameter?.id}`,
        method: 'POST',
        body: postChildLocationParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    putLocation: builder.mutation({
      query: (putLocationParameter: any) => ({
        url: `${PUT_LOCATION}?id=${putLocationParameter?.id}`,
        method: 'PUT',
        body: putLocationParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    putChildLocation: builder.mutation({
      query: (putChildLocationParameter: any) => ({
        url: `${PUT_LOCATION}?id=${putChildLocationParameter?.id}`,
        method: 'PUT',
        body: putChildLocationParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  usePostLocationMutation,
  useGetLocationQuery,
  usePostChildLocationMutation,
  usePutLocationMutation,
  usePutChildLocationMutation,
} = locationAPI;
