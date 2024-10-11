import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const TAG = ['SETTINGS_USERS_MANAGEMENT'];

export const TeamsApi: any = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (params) => ({
        url: END_POINTS?.SALES_TEAM,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getTeamsUsers: builder.query({
      query: (params) => ({
        url: END_POINTS?.SALES_TEAM_USERS,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getTeamsList: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.SALES_TEAM,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.userTeams;
      },
      providesTags: TAG,
    }),

    getTeamsById: builder.query({
      query: (id: any) => {
        return {
          url: `${END_POINTS?.SALES_TEAM}/${id}`,
          method: 'GET',
        };
      },
      providesTags: TAG,
    }),

    postTeams: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.SALES_TEAM,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),

    updateTeams: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.SALES_TEAM}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),

    deleteTeams: builder.mutation({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.SALES_TEAM}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
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
  useGetTeamsUsersQuery,
} = TeamsApi;
