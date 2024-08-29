import { AIR_MARKETER } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const socialMarketerAPI: any = baseAPI.injectEndpoints({
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
      query: (id: any) => {
        return {
          url: `${AIR_MARKETER?.CAMPAIGNS}/{id}?id=${id}`,
          method: 'GET',
        };
      },
      providesTags: ['CAMPAIGNS'],
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
    updateCampaigns: builder.mutation({
      query: ({ body, id }: any) => {
        return {
          url: `${AIR_MARKETER?.CAMPAIGNS}/${id}`,
          method: 'PATCH',
          body: body,
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

    getCampaignsTaskById: builder.query({
      query: (id: any) => ({
        url: `${AIR_MARKETER?.CAMPAIGNS_TASKS}/${id}`,
        method: 'GET',
      }),
      providesTags: ['CAMPAIGNS_TASKS'],
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
    postCampaignsClone: builder.mutation({
      query: (name: any) => {
        return {
          url: `${AIR_MARKETER?.CAMPAIGNS_CLONE}/${name}`,
          method: 'POST',
        };
      },
      invalidatesTags: ['CAMPAIGNS'],
    }),
    postCampaignsSaveView: builder.mutation({
      query: (body) => {
        return {
          url: `${AIR_MARKETER?.CAMPAIGNS_SAVE_VIEW}`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['CAMPAIGNS'],
    }),
    getCampaignsSaveView: builder.query({
      query: () => ({
        url: `${AIR_MARKETER?.CAMPAIGNS_SAVE_VIEW}`,
        method: 'GET',
      }),
      providesTags: ['CAMPAIGNS'],
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
  useUpdateCampaignsMutation,
  useGetCampaignsTaskByIdQuery,
  usePostCampaignsCloneMutation,
  usePostCampaignsSaveViewMutation,
  useGetCampaignsSaveViewQuery,
} = socialMarketerAPI;
