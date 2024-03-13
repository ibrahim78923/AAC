import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

export const ProductUsersApi: any = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProductsUsers: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.PRODUCTS_USERS,
        method: 'GET',
        params: params,
      }),
      providesTags: ['USER'],
    }),

    // getTeamsById: builder.query({
    //   query: (id: any) => {
    //     return {
    //       url: `${END_POINTS?.SALES_TEAM}/${id}`,
    //       method: 'GET',
    //     };
    //   },
    //   providesTags: ['TEAMS'],
    // }),

    postPoductUser: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.PRODUCTS_USERS,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['USER'],
    }),

    updateUsers: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.ADD_USER}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: ['USERS'],
    }),

    //     deleteTeams: builder.mutation({
    //       query: ({ id }: any) => ({
    //         url: `${END_POINTS?.SALES_TEAM}/${id}`,
    //         method: 'DELETE',
    //       }),
    //       invalidatesTags: ['TEAMS'],
    //     }),
  }),
});

export const {
  useGetProductsUsersQuery,
  // useGetTeamsByIdQuery,
  usePostPoductUserMutation,
  useUpdateUsersMutation,
  // useDeleteTeamsMutation,
} = ProductUsersApi;
