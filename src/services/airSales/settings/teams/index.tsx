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

    // updateUsers: builder.mutation({
    //   query: ({ id, body }: any) => {
    //     return {
    //       url: `${END_POINTS?.ADD_USER}/${id}`,
    //       method: 'PATCH',
    //       body: body,
    //     };
    //   },
    //   invalidatesTags: ['USERS'],
    // }),

    // deleteUsers: builder.mutation({
    //   query: ({ id }: any) => ({
    //     url: `/${id}`,
    //     method: 'GET',
    //   }),
    //   invalidatesTags: ['USERS'],
    // }),
  }),
});

export const { useGetTeamsQuery, useGetTeamsByIdQuery, usePostTeamsMutation } =
  TeamsApi;
