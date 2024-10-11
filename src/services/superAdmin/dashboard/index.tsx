import { SUPER_ADMIN_DASHBOARD } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = ['SUPER_ADMIN_DASHBOARD'];

export const superadminDashboardAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUsersStats: builder.query({
      query: ({ params }: any) => ({
        url: `${SUPER_ADMIN_DASHBOARD?.USER_STATS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getPlanStats: builder.query({
      query: ({ params }: any) => ({
        url: `${SUPER_ADMIN_DASHBOARD?.PLAN_STATS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getBillingDetails: builder.query({
      query: ({ params }: any) => ({
        url: `${SUPER_ADMIN_DASHBOARD?.BILLING_INVOICES}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getPlanListDetails: builder.query({
      query: ({ params }: any) => ({
        url: `${SUPER_ADMIN_DASHBOARD?.PLANS_LIST}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getEnquiriesDetails: builder.query({
      query: ({ params }: any) => ({
        url: `${SUPER_ADMIN_DASHBOARD?.ENQUIRIES}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
  }),
});

export const {
  useGetEnquiriesDetailsQuery,
  useGetPlanListDetailsQuery,
  useGetBillingDetailsQuery,
  useGetUsersStatsQuery,
  useGetPlanStatsQuery,
} = superadminDashboardAPI;
