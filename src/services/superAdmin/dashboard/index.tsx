import { SUPER_ADMIN_DASHBOARD } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const superadminDashboardAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUsersStats: builder.query({
      query: ({ params }: any) => ({
        url: `${SUPER_ADMIN_DASHBOARD?.USER_STATS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['SUPER_ADMIN_DASHBOARD'],
    }),

    getPlanStats: builder.query({
      query: ({ params }: any) => ({
        url: `${SUPER_ADMIN_DASHBOARD?.PLAN_STATS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['SUPER_ADMIN_DASHBOARD'],
    }),

    getBillingDetails: builder.query({
      query: ({ params }: any) => ({
        url: `${SUPER_ADMIN_DASHBOARD?.BILLING_INVOICES}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['SUPER_ADMIN_DASHBOARD'],
    }),

    getPlanListDetails: builder.query({
      query: ({ params }: any) => ({
        url: `${SUPER_ADMIN_DASHBOARD?.PLANS_LIST}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['SUPER_ADMIN_DASHBOARD'],
    }),
  }),
});

export const {
  useGetPlanListDetailsQuery,
  useGetBillingDetailsQuery,
  useGetUsersStatsQuery,
  useGetPlanStatsQuery,
} = superadminDashboardAPI;
