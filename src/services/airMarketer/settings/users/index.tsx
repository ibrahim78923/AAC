import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const TAG = ['SETTINGS_USERS_MANAGEMENT'];

export const ProductUsersApi: any = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProductsUsers: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.PRODUCT_ALL_USERS,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    getAvailedUsers: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.AVAILABLE_USERS,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getproductUsersById: builder.query({
      query: ({ id }: any) => {
        return {
          url: `${END_POINTS?.PRODUCTS_USERS}/${id}`,
          method: 'GET',
        };
      },
      providesTags: TAG,
    }),

    postPoductUser: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.PRODUCTS_USERS,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),

    updateProductsUsers: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.PRODUCTS_USERS}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),

    deleteProductUser: builder.mutation({
      query: (ids: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}/${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetProductsUsersQuery,
  useGetproductUsersByIdQuery,
  usePostPoductUserMutation,
  useUpdateProductsUsersMutation,
  useDeleteProductUserMutation,
  useGetAvailedUsersQuery,
} = ProductUsersApi;
