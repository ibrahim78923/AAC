import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'NON_REGISTER_DASHBOARD';

export const nonRegisterDashboardAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getNonRegisterDashboard: builder?.query({
      query: () => ({
        url: `${END_POINTS?.GET_ALL_ARTICLES}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useGetNonRegisterDashboardQuery } = nonRegisterDashboardAPI;
