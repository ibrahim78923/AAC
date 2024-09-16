import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const customerPortalLayoutAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getPublicCustomerPermissions: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.CUSTOMER_PORTAL_PUBLIC_PERMISSIONS}/${params?.id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyGetPublicCustomerPermissionsQuery } =
  customerPortalLayoutAPI;
