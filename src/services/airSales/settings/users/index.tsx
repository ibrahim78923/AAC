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
      providesTags: ['PRODUCT_USER'],
    }),

    getproductUsersById: builder.query({
      query: ({ id }: any) => {
        return {
          url: `${END_POINTS?.PRODUCTS_USERS}/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['PRODUCT_USER'],
    }),

    postPoductUser: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.PRODUCTS_USERS,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['PRODUCT_USER'],
    }),

    updateProductsUsers: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.PRODUCTS_USERS}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: ['PRODUCT_USER'],
    }),

    deleteProductUser: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}`,
        method: 'DELETE',
        body: body,
      }),
      invalidatesTags: ['PRODUCT_USER'],
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
