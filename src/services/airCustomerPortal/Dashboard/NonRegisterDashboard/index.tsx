import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'NON_REGISTER_DASHBOARD';

export const customerPortalDashboardNonRegisterDashboardAPI =
  baseAPI?.injectEndpoints({
    endpoints: (builder) => ({
      getCustomerPortalDashboardNonRegisterDashboard: builder?.query({
        query: () => ({
          url: `${END_POINTS?.GET_ALL_ARTICLES}`,
          method: 'GET',
        }),
        providesTags: [TAG],
      }),
    }),
  });

export const { useGetCustomerPortalDashboardNonRegisterDashboardQuery } =
  customerPortalDashboardNonRegisterDashboardAPI;
