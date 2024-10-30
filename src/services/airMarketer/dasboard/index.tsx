import { END_POINTS, SALES_DASHBOARD } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['MARKETING_DASHBOARD'];

export const marketerDashboardApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getMarketingDashboards: builder.query({
      query: ({ params }: any) => ({
        url: SALES_DASHBOARD?.SALES_DASHBOARD_LIST,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getSMarketingDashboardsList: builder?.query({
      query: ({ params }: any) => ({
        url: SALES_DASHBOARD?.SALES_DASHBOARD_LIST,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.dynamicdashboards;
      },
    }),

    deleteMarketingDashboard: builder.mutation({
      query: (ids: any) => ({
        url: `${SALES_DASHBOARD?.DELETE_SALES_DASHBOARD}?ids=${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
    updateDefaultMarketingDashboard: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: SALES_DASHBOARD?.UPDATE_DEFAULT_SALES_DASHBOARD,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
    getMarketingDashboardById: builder.query({
      query: ({ id, userId }: any) => ({
        url: `${SALES_DASHBOARD?.SALES_DASHBOARD_LIST}/${id}/${userId}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    postMarketingDashboard: builder.mutation({
      query: ({ body }: any) => ({
        url: SALES_DASHBOARD?.CREATE_SALES_DASHBOARD,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    updateMarketingDashboard: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: SALES_DASHBOARD?.UPDATE_SALES_DASHBOARD,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
    getAllMarketingDashboards: builder.query({
      query: ({ params }: any) => ({
        url: `${SALES_DASHBOARD?.ALL_SALES_DASHBOARDS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    getMarketingDashboardUserAccessListDropdownListForDashboard: builder?.query(
      {
        query: ({ params }: any) => ({
          url: `${END_POINTS?.DROPDOWN_USERS}`,
          method: 'GET',
          params,
        }),
        transformResponse: (response: any) => {
          if (response) return response?.data;
        },
      },
    ),
    sendMarketerDashboardRecurringViaEmail: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.DASHBOARD_EMAIL,
        method: 'POST',
        params: apiDataParameter?.queryParams,
      }),
    }),
    sendMarketerDashboardViaEmailOnce: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.TICKET_NEW_EMAIL,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),

    getDealsCreated: builder.query({
      query: ({ params }: any) => ({
        url: SALES_DASHBOARD?.DEALS_CREATED_VS_CLOSE_DATES,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
  }),
});

export const {
  useGetMarketingDashboardsQuery,
  useLazyGetSMarketingDashboardsListQuery,
  usePostMarketingDashboardMutation,
  useGetAllMarketingDashboardsQuery,
  useGetMarketingDashboardByIdQuery,
  useUpdateMarketingDashboardMutation,
  useDeleteMarketingDashboardMutation,
  useUpdateDefaultMarketingDashboardMutation,
  useLazyGetMarketingDashboardUserAccessListDropdownListForDashboardQuery,
  useSendMarketerDashboardRecurringViaEmailMutation,
  useSendMarketerDashboardViaEmailOnceMutation,
  useGetDealsCreatedQuery,
} = marketerDashboardApi;
