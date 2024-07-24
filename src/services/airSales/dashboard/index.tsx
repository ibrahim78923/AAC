import { END_POINTS, SALES_DASHBOARD } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['SALES_DASHBOARD'];

export const salesDashboardApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDealsCreated: builder.query({
      query: ({ params }: any) => ({
        url: `${SALES_DASHBOARD?.DEALS_CREATED_VS_CLOSE_DATES}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    getSalesDashboards: builder.query({
      query: ({ params }: any) => ({
        url: `${SALES_DASHBOARD?.SALES_DASHBOARD}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    postSalesDashboard: builder.mutation({
      query: ({ body }: any) => ({
        url: `${SALES_DASHBOARD?.SALES_DASHBOARD}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    getSalesDashboardUserAccessListDropdownListForDashboard: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
  }),
});

export const {
  useGetDealsCreatedQuery,
  useGetSalesDashboardsQuery,
  usePostSalesDashboardMutation,

  useLazyGetSalesDashboardUserAccessListDropdownListForDashboardQuery,
} = salesDashboardApi;
