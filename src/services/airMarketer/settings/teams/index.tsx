import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const TAG = ['SETTINGS_USERS_MANAGEMENT'];

export const TeamsApi: any = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getMarketerTeams: builder.query({
      query: (params) => ({
        url: END_POINTS?.SALES_TEAM,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getMarketerTeamsById: builder.query({
      query: (id: any) => {
        return {
          url: `${END_POINTS?.SALES_TEAM}/${id}`,
          method: 'GET',
        };
      },
      providesTags: TAG,
    }),

    postMarketerTeams: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.SALES_TEAM,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),

    updateMarketerTeams: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.SALES_TEAM}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),

    deleteMarketerTeams: builder.mutation({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.SALES_TEAM}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetMarketerTeamsQuery,
  useGetMarketerTeamsByIdQuery,
  usePostMarketerTeamsMutation,
  useUpdateMarketerTeamsMutation,
  useDeleteMarketerTeamsMutation,
} = TeamsApi;
