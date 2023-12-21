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

    getDealsById: builder.query({
      query: () => {
        return {
          url: ``,
          method: 'GET',
        };
      },
      providesTags: ['DEALS'],
    }),

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

    getDealsSalesProduct: builder.query({
      query: () => ({
        url: `${END_POINTS?.DEALS_PIPELINE}`,
        method: 'GET',
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
    getDealsUserList: builder.query({
      query: ({}) => ({
        url: `${END_POINTS?.DEALS_USER_LIST}`,
        method: 'GET',
      }),
      providesTags: ['DEALS'],
    }),
    getDealsGridView: builder.query({
      query: ({}) => ({
        url: `${END_POINTS?.DEALS_GRID_VIEW}`,
        method: 'GET',
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
  }),
});

export const {
  useGetDealsListQuery,
  useLazyGetDealsListQuery,
  useGetDealsByIdQuery,
  useGetDealsSalesProductQuery,
  useGetDealsLifecycleStageQuery,
  useGetDealsUserListQuery,
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
} = dealsApi;
