import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['FORECAST'];

export const forecastApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getForecastGoals: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GOALS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    deleteForecastGoals: builder.mutation({
      query: ({ ids }: any) => ({
        url: `${END_POINTS?.GOALS}/${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),

    getSingleForecastGoals: builder.query({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.GET_SINGLE_GOAL}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    postGoal: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.GOALS}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    patchGoal: builder.mutation({
      query: ({ body, id }: any) => ({
        url: `${END_POINTS?.GOALS}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetForecastGoalsQuery,
  useDeleteForecastGoalsMutation,
  useGetSingleForecastGoalsQuery,
  usePostGoalMutation,
  usePatchGoalMutation,
} = forecastApi;
