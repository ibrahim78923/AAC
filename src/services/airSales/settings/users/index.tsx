import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const USER_MANAGEMENT = 'SETTINGS_USERS_MANAGEMENT';

export const ProductUsersApi: any = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProductsUsers: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.PRODUCTS_USERS,
        method: 'GET',
        params: params,
      }),
      providesTags: [USER_MANAGEMENT],
    }),

    getproductUsersById: builder.query({
      query: ({ id }: any) => {
        return {
          url: `${END_POINTS?.PRODUCTS_USERS}/${id}`,
          method: 'GET',
        };
      },
      providesTags: [USER_MANAGEMENT],
    }),

    postPoductUser: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.PRODUCTS_USERS,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: [USER_MANAGEMENT],
    }),

    updateProductsUsers: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.PRODUCTS_USERS}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: [USER_MANAGEMENT],
    }),

    deleteProductUser: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}`,
        method: 'DELETE',
        body: body,
      }),
      invalidatesTags: [USER_MANAGEMENT],
    }),
  }),
});

export const {
  useGetProductsUsersQuery,
  useGetproductUsersByIdQuery,
  usePostPoductUserMutation,
  useUpdateProductsUsersMutation,
  useDeleteProductUserMutation,
} = ProductUsersApi;
