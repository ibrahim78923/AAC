import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

export const usersApi: any = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.ADD_USER,
        method: 'GET',
        params: params,
      }),
      providesTags: ['USERS'],
    }),
    getSuperAdminRoles: builder.query({
      query: () => ({
        url: END_POINTS?.SUPER_ADMIN_ROLES,
        method: 'GET',
      }),
      providesTags: ['USERS'],
    }),

    getUsersById: builder.query({
      query: (id: any) => {
        return {
          url: `${END_POINTS?.ADD_USER}/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['USERS'],
    }),

    postUsers: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.ADD_USER,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['USERS'],
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
  }),
});

export const {
  useUpdateUsersMutation,
  usePostUsersMutation,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetUsersByIdQuery,
  useGetSuperAdminRolesQuery,
} = usersApi;
