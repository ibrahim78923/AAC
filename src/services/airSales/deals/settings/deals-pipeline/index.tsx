import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const DealPipelineAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDealsPipeline: builder.query({
      query: ({ query, page, pageLimit }) => ({
        url: `${END_POINTS?.DEAL_PIPELINE}?page=${page}&limit=${pageLimit}${query}`,
        method: 'GET',
      }),
      providesTags: ['SETTINGS_DEAL_PIPELINE'],
    }),
    postDealsPipeline: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.DEAL_PIPELINE}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['SETTINGS_DEAL_PIPELINE'],
    }),
    updateDealsPipeline: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.DEAL_PIPELINE}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['SETTINGS_DEAL_PIPELINE'],
    }),
    deleteDealsPipeline: builder?.mutation({
      query: ({ id }) => ({
        url: `${END_POINTS?.DEAL_PIPELINE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SETTINGS_DEAL_PIPELINE'],
    }),
  }),
});

export const { useGetDealsPipelineQuery, usePostDealsPipelineMutation } =
  DealPipelineAPI;
