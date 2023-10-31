import { baseAPI } from '@/services/base-api';

export const rolesAndRightsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getRolesAndRights: builder.query({
      query: ({ id }: any) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['USERS'],
    }),
    postRolesAndRights: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `/users/${id}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['USERS'],
    }),
    updateRolesAndRights: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['USERS'],
    }),
    deleteRolesAndRights: builder.mutation({
      query: ({ id }: any) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ['USERS'],
    }),
  }),
});

export const {
  useUpdateRolesAndRightsMutation,
  usePostRolesAndRightsMutation,
  useGetRolesAndRightsQuery,
  useDeleteRolesAndRightsMutation,
} = rolesAndRightsApi;
