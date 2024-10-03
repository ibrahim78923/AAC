import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['FORECAST'];

export const forecastApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getForecastUserGoals: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_USER_GOALS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getForecastTeamGoals: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_TEAM_GOALS}`,
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
      query: ({ id, user }: any) => ({
        url: `${END_POINTS?.GET_SINGLE_GOAL}/${id}/${user}`,
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

    getForecastDealStageStats: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_STATS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    getForecastDealStagesUser: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_DEAL_STAGES_USER}`,
        method: 'GET',
        params: { ...params },
      }),
      providesTags: TAG,
    }),
    getForecastDealStagesTeam: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_DEAL_STAGES_TEAM}`,
        method: 'GET',
        params: { ...params },
      }),
      providesTags: TAG,
    }),
    getDealsPipelineForecast: builder.query({
      query: ({ meta }) => ({
        url: `${END_POINTS?.DEAL_PIPELINE}?meta=${meta}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    postForecast: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.FORECAST}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    getForecast: builder.query({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.FORECAST}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    patchForecast: builder.mutation({
      query: ({ body, id }: any) => ({
        url: `${END_POINTS?.FORECAST}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    deleteForecast: builder.mutation({
      query: ({ ids }: any) => ({
        url: `${END_POINTS?.FORECAST}/${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetForecastUserGoalsQuery,
  useGetForecastTeamGoalsQuery,
  useDeleteForecastGoalsMutation,
  useGetSingleForecastGoalsQuery,
  usePostGoalMutation,
  usePatchGoalMutation,
  useGetForecastDealStageStatsQuery,
  useGetForecastDealStagesUserQuery,
  useGetForecastDealStagesTeamQuery,
  useGetDealsPipelineForecastQuery,
  usePostForecastMutation,
  useGetForecastQuery,
  usePatchForecastMutation,
  useDeleteForecastMutation,
} = forecastApi;
