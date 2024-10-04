import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['SETTINGS_DEAL_PIPELINE'];
export const DealPipelineAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDealsPipeline: builder.query({
      query: ({ query, meta }) => ({
        url: `${END_POINTS?.DEAL_PIPELINE}?meta=${meta}${query}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    getDealsPipelineById: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.DEAL_PIPELINE}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    postDealsPipeline: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.DEAL_PIPELINE}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    updateDealsPipeline: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.DEAL_PIPELINE}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    deleteDealsPipeline: builder?.mutation({
      query: ({ ids }) => ({
        url: `${END_POINTS?.DEAL_PIPELINE}?ids=${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetDealsPipelineQuery,
  usePostDealsPipelineMutation,
  useDeleteDealsPipelineMutation,
  useUpdateDealsPipelineMutation,
  useGetDealsPipelineByIdQuery,
  useLazyGetDealsPipelineByIdQuery,
} = DealPipelineAPI;
