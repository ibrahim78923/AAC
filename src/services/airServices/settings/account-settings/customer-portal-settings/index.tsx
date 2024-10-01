import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'CUSTOMER_PORTAL_SETTINGS';

export const servicesAccountDetailsCustomerPortalSettingsApi =
  baseAPI.injectEndpoints({
    endpoints: (builder) => ({
      getServicesAccountDetailsCustomerPortalPermissions: builder?.query({
        query: (apiDataParameter: any) => ({
          url: `${END_POINTS?.POST_COMPANY_ACCOUNT}/${apiDataParameter?.pathParams?.id}`,
          method: 'GET',
        }),
        providesTags: [TAG],
      }),

      patchServicesAccountDetailsCustomerPortalPermissions: builder?.mutation({
        query: (apiDataParameter: any) => ({
          url: `${END_POINTS?.PATCH_CUSTOMER_PORTAL_PERMISSIONS}`,
          method: 'PATCH',
          body: apiDataParameter?.body,
        }),
        invalidatesTags: [TAG],
      }),

      patchServicesAccountDetailsCustomerPortalStylings: builder?.mutation({
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
  useGetServicesAccountDetailsCustomerPortalPermissionsQuery,
  usePatchServicesAccountDetailsCustomerPortalPermissionsMutation,
  usePatchServicesAccountDetailsCustomerPortalStylingsMutation,
} = servicesAccountDetailsCustomerPortalSettingsApi;
