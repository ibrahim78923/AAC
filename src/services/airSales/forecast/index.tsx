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
  }),
});

export const { useGetForecastGoalsQuery } = forecastApi;
