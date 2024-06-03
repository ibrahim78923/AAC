import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const superAdminReports = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getReportsGraph: builder.query({
      query: () => ({
        url: `${END_POINTS?.SUPER_ADMIN_USERS_REPORTS}`,
        method: 'GET',
      }),
      providesTags: ['REPORTS'],
    }),

    getInvoicesReports: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.SUPER_ADMIN_INVOICES_REPORTS}`,
        method: 'GET',
        params,
      }),
      providesTags: ['REPORTS'],
    }),
  }),
});

export const { useGetReportsGraphQuery, useGetInvoicesReportsQuery } =
  superAdminReports;
