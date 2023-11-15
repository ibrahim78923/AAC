import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

export const usersApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ role, search }) => ({
        url: `${END_POINTS?.ADD_USER}?page=1&limit=100&role=${role}&search=${search}`,
        method: 'GET',
      }),
      providesTags: ['USERS'],
    }),

    getCompaniesCRN: builder.query({
      query: ({ num }) => ({
        url: `${END_POINTS?.COMPANY_CRN}?by=crn&q=${num}`,
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
      query: ({ id, ...queryParams }: any) => {
        return {
          url: `${END_POINTS?.UPDATE_USER_LIST}/${id}`,
          method: 'PATCH',
          params: queryParams,
        };
      },
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
  useGetCompaniesCRNQuery,
  useDeleteUsersMutation,
  useGetUsersByIdQuery,
} = usersApi;
