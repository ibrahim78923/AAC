import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

export const TeamsApi: any = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (params) => ({
        url: END_POINTS?.SALES_TEAM,
        method: 'GET',
        params: params,
      }),
      providesTags: ['TEAMS'],
    }),

    getTeamsList: builder.query({
      query: () => ({
        url: END_POINTS?.SALES_TEAM,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.userTeams;
      },
      providesTags: ['TEAMS'],
    }),

    getTeamsById: builder.query({
      query: (id: any) => {
        return {
          url: `${END_POINTS?.SALES_TEAM}/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['TEAMS'],
    }),

    postTeams: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.SALES_TEAM,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['TEAMS'],
    }),

    updateTeams: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.SALES_TEAM}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: ['TEAMS'],
    }),

    deleteTeams: builder.mutation({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.SALES_TEAM}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TEAMS'],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useLazyGetTeamsListQuery,
  useGetTeamsByIdQuery,
  usePostTeamsMutation,
  useUpdateTeamsMutation,
  useDeleteTeamsMutation,
} = TeamsApi;
