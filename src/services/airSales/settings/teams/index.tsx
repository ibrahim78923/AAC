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
      providesTags: ['SETTINGS_USERS_MANAGEMENT'],
    }),

    getTeamsList: builder.query({
      query: () => ({
        url: END_POINTS?.SALES_TEAM,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.userTeams;
      },
      providesTags: ['SETTINGS_USERS_MANAGEMENT'],
    }),

    getTeamsById: builder.query({
      query: (id: any) => {
        return {
          url: `${END_POINTS?.SALES_TEAM}/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['SETTINGS_USERS_MANAGEMENT'],
    }),

    postTeams: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.SALES_TEAM,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['SETTINGS_USERS_MANAGEMENT'],
    }),

    updateTeams: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.SALES_TEAM}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: ['SETTINGS_USERS_MANAGEMENT'],
    }),

    deleteTeams: builder.mutation({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.SALES_TEAM}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SETTINGS_USERS_MANAGEMENT'],
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
