import { END_POINTS, SALES_DASHBOARD } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['SALES_DASHBOARD'];

export const salesDashboardApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDealsCreated: builder.query({
      query: ({ params }: any) => ({
        url: SALES_DASHBOARD?.DEALS_CREATED_VS_CLOSE_DATES,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getSalesDashboards: builder.query({
      query: ({ params }: any) => ({
        url: SALES_DASHBOARD?.SALES_DASHBOARD_LIST,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getSalesDashboardById: builder.query({
      query: (id: any) => ({
        url: `${SALES_DASHBOARD?.SALES_DASHBOARD_LIST}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    postSalesDashboard: builder.mutation({
      query: ({ body }: any) => ({
        url: SALES_DASHBOARD?.CREATE_SALES_DASHBOARD,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    updateSalesDashboard: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: SALES_DASHBOARD?.UPDATE_SALES_DASHBOARD,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),

    updateDefaultSalesDashboard: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: SALES_DASHBOARD?.UPDATE_DEFAULT_SALES_DASHBOARD,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),

    deleteSalesDashboard: builder.mutation({
      query: (ids: any) => ({
        url: `${SALES_DASHBOARD?.DELETE_SALES_DASHBOARD}?ids=${ids}`,
        method: 'DELETE',
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

    getAllSalesDashboards: builder.query({
      query: ({ params }: any) => ({
        url: `${SALES_DASHBOARD?.ALL_SALES_DASHBOARDS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    sendSalesDashboardRecurringViaEmail: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.DASHBOARD_EMAIL,
        method: 'POST',
        params: apiDataParameter?.queryParams,
      }),
    }),
    sendSalesDashboardViaEmailOnce: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.TICKET_NEW_EMAIL,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
  }),
});

export const {
  useGetDealsCreatedQuery,
  useGetSalesDashboardsQuery,
  usePostSalesDashboardMutation,
  useGetSalesDashboardByIdQuery,
  useDeleteSalesDashboardMutation,
  useUpdateSalesDashboardMutation,
  useGetAllSalesDashboardsQuery,
  useUpdateDefaultSalesDashboardMutation,
  useLazyGetSalesDashboardUserAccessListDropdownListForDashboardQuery,
  useSendSalesDashboardRecurringViaEmailMutation,
  useSendSalesDashboardViaEmailOnceMutation,
} = salesDashboardApi;
