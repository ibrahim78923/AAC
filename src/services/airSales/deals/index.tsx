import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

export const dealsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDealsList: builder.query({
      query: (params?: any) => ({
        url: `${END_POINTS?.DEALS_LIST_VIEW}`,
        method: 'GET',
        params,
      }),
      providesTags: ['DEALS'],
    }),
    getDealsAssociations: builder.query({
      query: () => ({
        // todo: used this id to impement all view Details cases temporarily
        url: `${END_POINTS?.DEALS_ASSOCIATION}/${'655b2b2ecd318b576d7d71e8'}`,
        method: 'GET',
      }),
      providesTags: ['DEALS_ASSOCIATION'],
    }),

    // getDealsById: builder.query({
    //   query: () => {
    //     return {
    //       url: ``,
    //       method: 'GET',
    //     };
    //   },
    //   providesTags: ['DEALS'],
    // }),

    postDeals: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.POST_DEALS,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['DEALS'],
    }),

    getDealPipeLine: builder.query({
      query: ({ ...params }: any) => ({
        url: `${END_POINTS?.DEALS_PIPELINE}`,
        method: 'GET',
        params,
      }),
      providesTags: ['DEALS'],
    }),

    getDealsLifecycleStage: builder.query({
      query: ({}) => ({
        url: `${END_POINTS?.DEALS_LIFECYCLE_STAGES}`,
        method: 'GET',
      }),
      providesTags: ['DEALS'],
    }),

    getAddLineItems: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.SALE_PRODUCTS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['DEALS'],
    }),
    // getDealsUserList: builder.query({
    //   query: ({}) => ({
    //     url: `${END_POINTS?.DEALS_USER_LIST}`,
    //     method: 'GET',
    //   }),
    //   providesTags: ['DEALS'],
    // }),
    getDealsGridView: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.DEALS_GRID_VIEW}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['DEALS'],
    }),
    getDealsActionPreview: builder.query({
      query: ({ id }) => {
        return {
          url: `${END_POINTS?.DEALS_ACTION_PREVIEW}/?id=${id}`,
          method: 'GET',
        };
      },
      providesTags: ['DEALS'],
    }),
    getDealsViews: builder.query({
      query: () => {
        return {
          url: `${END_POINTS?.GET_DEALS_VIEWS}`,
          method: 'GET',
        };
      },
      providesTags: ['DEALS'],
    }),
    getRestoreDeals: builder.query({
      query: ({ params }: any) => {
        return {
          url: `${END_POINTS?.RESTORE_DEALS}`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['DEALS'],
    }),

    createViewDeals: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.POST_DEALS_VIEW,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['DEALS'],
    }),

    updateDeals: builder.mutation({
      query: ({ id, ...queryParams }: any) => {
        return {
          url: `${END_POINTS?.UPDATE_USER_LIST}/${id}`,
          method: 'PATCH',
          params: queryParams,
        };
      },
      invalidatesTags: ['DEALS'],
    }),

    deleteDeals: builder.mutation({
      query: ({ ids }: any) => ({
        url: `${END_POINTS?.DELETE_DEALS}/${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['DEALS'],
    }),
    updateRestoreDeals: builder.mutation({
      query: ({ id, action }: any) => ({
        url: `${END_POINTS?.PATCH_RESTORE_DEAL_ACTION}?id=${id}&action=${action}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['DEALS'],
    }),
    getDealsListWithOutParams: builder.query({
      query: ({ url }) => ({
        url,
        method: 'GET',
      }),
      providesTags: ['DEALS'],
    }),
    getUsersList: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.USERS_LIST_ADMIN}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['DEALS'],
    }),
    patchDeals: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.POST_DEALS}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: ['DEALS'],
    }),
    getCustomizeColumn: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.DEALS_CUSTOMIZE_COLUMN}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['DEALS'],
    }),
    updatedGridDeals: builder.mutation({
      query: ({ body, id }: any) => {
        return {
          url: `${END_POINTS?.POST_DEALS}/${id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: ['DEALS'],
    }),
    putCustomizedColumns: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.DEALS_CUSTOMIZE_COLUMN}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['DEALS', 'CUSTOMIZE'],
    }),
  }),
});

export const {
  useGetDealsListQuery,
  // useGetDealsByIdQuery,
  useGetDealPipeLineQuery,
  useGetDealsLifecycleStageQuery,
  useGetAddLineItemsQuery,
  // useGetDealsUserListQuery,
  useGetDealsGridViewQuery,
  useGetDealsActionPreviewQuery,
  useGetDealsViewsQuery,
  useLazyGetDealsViewsQuery,
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
} = dealsApi;
