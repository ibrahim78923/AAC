import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'CUSTOMER_PORTAL_DASHBOARD';

export const customerPortalDashboardAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPopularArticles: builder?.query({
      query: (getArticlesParameter: any) => ({
        url: END_POINTS?.KNOWLEDGE_BASE_ARTICLES,
        params: getArticlesParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getRecentTickets: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useGetPopularArticlesQuery, useGetRecentTicketsQuery } =
  customerPortalDashboardAPI;
