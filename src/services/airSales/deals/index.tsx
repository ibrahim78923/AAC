import { baseAPI, TAGS } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

export const dealsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDealsList: builder.query({
      query: (values: any) => ({
        url: `${END_POINTS?.DEALS_LIST_VIEW}`,
        method: 'GET',
        params: values,
      }),
      providesTags: TAGS,
    }),

    getDealsAssociations: builder.query({
      query: ({ id, params }) => ({
        url: `${END_POINTS?.DEALS_ASSOCIATION}/${id}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['DEALS_ASSOCIATION', 'DEALS', 'COMPANY'],
    }),

    postDeals: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.POST_DEALS,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAGS,
    }),

    getDealPipeLine: builder.query({
      query: ({ ...params }: any) => ({
        url: `${END_POINTS?.DEALS_PIPELINE}`,
        method: 'GET',
        params,
      }),
      providesTags: TAGS,
    }),

    getDealPipeLineList: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DEALS_PIPELINE}`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: TAGS,
    }),

    getDealsLifecycleStage: builder.query({
      query: ({}) => ({
        url: `${END_POINTS?.DEALS_LIFECYCLE_STAGES}`,
        method: 'GET',
      }),
      providesTags: TAGS,
    }),

    getAddLineItems: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.SALE_PRODUCTS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAGS,
    }),

    getDealsGridView: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.DEALS_GRID_VIEW}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAGS,
    }),
    getDealsActionPreview: builder.query({
      query: ({ id }) => {
        return {
          url: `${END_POINTS?.DEALS_ACTION_PREVIEW}/?id=${id}`,
          method: 'GET',
        };
      },
      providesTags: TAGS,
    }),
    getDealsViews: builder.query({
      query: (params: any) => {
        return {
          url: `${END_POINTS?.GET_DEALS_VIEWS}`,
          method: 'GET',
          params,
        };
      },
      providesTags: TAGS,
    }),

    updateDealsView: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.UPDATE_DEALS_VIEW,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: TAGS,
    }),

    getRestoreDeals: builder.query({
      query: ({ params }: any) => {
        return {
          url: `${END_POINTS?.RESTORE_DEALS}`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: TAGS,
    }),

    createViewDeals: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.POST_DEALS_VIEW,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: TAGS,
    }),

    updateDeals: builder.mutation({
      query: ({ id, ...queryParams }: any) => {
        return {
          url: `${END_POINTS?.UPDATE_USER_LIST}/${id}`,
          method: 'PATCH',
          params: queryParams,
        };
      },
      invalidatesTags: TAGS,
    }),

    deleteDeals: builder.mutation({
      query: ({ ids }: any) => ({
        url: `${END_POINTS?.DELETE_DEALS}?ids=${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAGS,
    }),
    updateRestoreDeals: builder.mutation({
      query: ({ id, action }: any) => ({
        url: `${END_POINTS?.PATCH_RESTORE_DEAL_ACTION}?id=${id}&action=${action}`,
        method: 'PATCH',
      }),
      invalidatesTags: TAGS,
    }),
    getDealsListWithOutParams: builder.query({
      query: ({ url }) => ({
        url,
        method: 'GET',
      }),
      providesTags: TAGS,
    }),
    getUsersList: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.USERS_LIST_ADMIN}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAGS,
    }),
    getUsersListDropdown: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.USERS_LIST_ADMIN}`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.users;
      },
      providesTags: TAGS,
    }),
    patchDeals: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.POST_DEALS}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAGS,
    }),
    getCustomizeColumn: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.CUSTOMIZE_COLUMNS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAGS,
    }),
    updatedGridDeals: builder.mutation({
      query: ({ body, id }: any) => {
        return {
          url: `${END_POINTS?.POST_DEALS}/${id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: TAGS,
    }),
    putCustomizedColumns: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.CUSTOMIZE_COLUMNS}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: TAGS,
    }),
    getDealsListAsExport: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.DEALS_LIST_VIEW}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
      providesTags: TAGS,
    }),
  }),
});

export const {
  useGetDealsListQuery,
  useGetDealPipeLineQuery,
  useLazyGetDealPipeLineListQuery,
  useGetDealsLifecycleStageQuery,
  useGetAddLineItemsQuery,
  useGetDealsGridViewQuery,
  useGetDealsActionPreviewQuery,
  useLazyGetDealsActionPreviewQuery,
  useGetDealsViewsQuery,
  useLazyGetDealsViewsQuery,
  useUpdateDealsViewMutation,
  useGetRestoreDealsQuery,
  useUpdateDealsMutation,
  usePostDealsMutation,
  useCreateViewDealsMutation,
  useDeleteDealsMutation,
  useUpdateRestoreDealsMutation,
  useGetDealsListWithOutParamsQuery,
  useGetUsersListQuery,
  usePatchDealsMutation,
  useGetDealsAssociationsQuery,
  useGetCustomizeColumnQuery,
  useUpdatedGridDealsMutation,
  usePutCustomizedColumnsMutation,
  useLazyGetUsersListDropdownQuery,
  useLazyGetDealsListAsExportQuery,
} = dealsApi;
