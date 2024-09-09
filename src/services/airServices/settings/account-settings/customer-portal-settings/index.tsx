import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'CUSTOMER_PORTAL_SETTINGS';

export const customerPortalSettingsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerPortalPermissions: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.POST_COMPANY_ACCOUNT}/${apiDataParameter?.pathParams?.id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),

    patchCustomerPortalPermissions: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.PATCH_CUSTOMER_PORTAL_PERMISSIONS}`,
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    patchCustomerPortalStylings: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.CUSTOMER_PORTAL_STYLINGS,
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetCustomerPortalPermissionsQuery,
  usePatchCustomerPortalPermissionsMutation,
  usePatchCustomerPortalStylingsMutation,
} = customerPortalSettingsApi;
