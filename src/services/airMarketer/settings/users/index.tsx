import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const SETTING_USERS = 'SETTINGS_USERS_MANAGEMENT';

export const ProductUsersApi: any = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProductsUsers: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.PRODUCT_ALL_USERS,
        method: 'GET',
        params: params,
      }),
      providesTags: [SETTING_USERS],
    }),
    getAvailedUsers: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.AVAILABLE_USERS,
        method: 'GET',
        params: params,
      }),
      providesTags: [SETTING_USERS],
    }),

    getproductUsersById: builder.query({
      query: ({ id }: any) => {
        return {
          url: `${END_POINTS?.PRODUCTS_USERS}/${id}`,
          method: 'GET',
        };
      },
      providesTags: [SETTING_USERS],
    }),

    postPoductUser: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.PRODUCTS_USERS,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: [SETTING_USERS],
    }),

    updateProductsUsers: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.PRODUCTS_USERS}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: [SETTING_USERS],
    }),

    deleteProductUser: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}`,
        method: 'DELETE',
        body: body,
      }),
      invalidatesTags: [SETTING_USERS],
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
