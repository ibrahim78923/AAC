import { AIR_MARKETER } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const socialMarketerAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query({
      query: ({ ...params }) => ({
        url: `${AIR_MARKETER?.CAMPAIGNS}`,
        method: 'GET',
        params,
      }),
      providesTags: ['CAMPAIGNS'],
    }),
    getCampaignsById: builder.query({
      query: ({ id, productSearchKeyword }: any) => ({
        url: `${AIR_MARKETER?.CAMPAIGNS}/{id}?id=${id}`,
        method: 'GET',
        params: { productSearchKeyword },
      }),
      providesTags: ['AIR_SALES_QUOTES', 'CONTACTS'],
    }),
    postCampaigns: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: AIR_MARKETER?.CAMPAIGNS,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['CAMPAIGNS'],
    }),
    deleteCampaigns: builder.mutation({
      query: ({ ids }: any) => {
        return {
          url: `${AIR_MARKETER?.CAMPAIGNS}/${ids}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['CAMPAIGNS'],
    }),
    getCampaignsTasks: builder.query({
      query: (params) => ({
        url: `${AIR_MARKETER?.CAMPAIGNS_TASKS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['CAMPAIGNS_TASKS'],
    }),

    postCampaignTask: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${AIR_MARKETER?.CAMPAIGNS_TASKS}`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['CAMPAIGNS_TASKS'],
    }),

    deleteCampaignTasks: builder.mutation({
      query: ({ ids }: any) => ({
        url: `${AIR_MARKETER?.CAMPAIGNS_TASKS}/${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CAMPAIGNS_TASKS'],
    }),

    updateCampaignTasks: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${AIR_MARKETER?.CAMPAIGNS_TASKS}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: ['CAMPAIGNS_TASKS'],
    }),
  }),
});

export const {
  useGetCampaignsQuery,
  usePostCampaignsMutation,
  useDeleteCampaignsMutation,
  useGetCampaignsByIdQuery,
  useGetCampaignsTasksQuery,
  usePostCampaignTaskMutation,
  useDeleteCampaignTasksMutation,
  useUpdateCampaignTasksMutation,
} = socialMarketerAPI;
