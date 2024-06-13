import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'AIR_LOYALTY_USERS';

export const airLoyaltyUserApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getProductUserListForLoyalty: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getSingleProductUserDetailForLoyalty: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}/${apiDataParameter?.pathParams?.id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    addProductUserForLoyalty: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}`,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteProductUsers: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}`,
        method: 'DELETE',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    updateProductUserForLoyalty: builder.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PRODUCTS_USERS}/${apiDataParameter?.pathParams?.id}`,
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getPermissionsRoleForUpsertUser: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.PERMISSIONS_ROLE}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.companyaccountroles;
      },
      providesTags: [TAG],
    }),
  }),
});

export const {
  useLazyGetProductUserListForLoyaltyQuery,
  useGetProductUserListForLoyaltyQuery,
  useAddProductUserForLoyaltyMutation,
  useDeleteProductUsersMutation,
  useUpdateProductUserForLoyaltyMutation,
  useLazyGetPermissionsRoleForUpsertUserQuery,
  useGetSingleProductUserDetailForLoyaltyQuery,
} = airLoyaltyUserApi;
