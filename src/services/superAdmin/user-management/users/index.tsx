import { baseAPI } from '@/services/base-api';
import { endpoints } from '@/routesConstants/endpoints';

export const usersApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ role }) => ({
        url: `${endpoints?.USER_LIST}?role=${role}`,
        method: 'GET',
      }),
      providesTags: ['USERS'],
    }),

    getUsersById: builder.query({
      query: ({ id }: any) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: ['USERS'],
    }),

    postUsers: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: endpoints?.ADD_USER,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['USERS'],
    }),
    updateUsers: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['USERS'],
    }),
    deleteUsers: builder.mutation({
      query: ({ id }: any) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ['USERS'],
    }),
  }),
});

export const {
  useUpdateUsersMutation,
  usePostUsersMutation,
  useGetUsersQuery,
  useDeleteUsersMutation,
  useGetUsersByIdQuery,
} = usersApi;
