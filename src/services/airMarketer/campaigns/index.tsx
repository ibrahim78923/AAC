import { AIR_MARKETER } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = ['CAMPAIGNS'];
const TAG_TASKS = ['CAMPAIGNS_TASKS'];

export const socialMarketerAPI: any = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query({
      query: ({ ...params }) => ({
        url: `${AIR_MARKETER?.CAMPAIGNS}`,
        method: 'GET',
        params,
      }),
      providesTags: TAG,
    }),
    getCampaignsById: builder.query({
      query: (id: any) => {
        return {
          url: `${AIR_MARKETER?.CAMPAIGNS}/{id}?id=${id}`,
          method: 'GET',
        };
      },
      providesTags: TAG,
    }),
    postCampaigns: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: AIR_MARKETER?.CAMPAIGNS,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
    deleteCampaigns: builder.mutation({
      query: ({ ids }: any) => {
        return {
          url: `${AIR_MARKETER?.CAMPAIGNS}/${ids}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: TAG,
    }),
    updateCampaigns: builder.mutation({
      query: ({ body, id }: any) => {
        return {
          url: `${AIR_MARKETER?.CAMPAIGNS}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
    getCampaignsTasks: builder.query({
      query: (params) => ({
        url: `${AIR_MARKETER?.CAMPAIGNS_TASKS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG_TASKS,
    }),
    postCampaignTask: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${AIR_MARKETER?.CAMPAIGNS_TASKS}`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG_TASKS,
    }),
    getCampaignsTaskById: builder.query({
      query: (id: any) => ({
        url: `${AIR_MARKETER?.CAMPAIGNS_TASKS}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG_TASKS,
    }),
    deleteCampaignTasks: builder.mutation({
      query: ({ ids }: any) => ({
        url: `${AIR_MARKETER?.CAMPAIGNS_TASKS}/${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG_TASKS,
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
      invalidatesTags: TAG,
    }),
    postCampaignsSaveView: builder.mutation({
      query: (body) => {
        return {
          url: `${AIR_MARKETER?.CAMPAIGNS_SAVE_VIEW}`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
    getCampaignsSaveView: builder.query({
      query: () => ({
        url: `${AIR_MARKETER?.CAMPAIGNS_SAVE_VIEW}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    getCampaignsListAsExport: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${AIR_MARKETER?.CAMPAIGNS}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
      providesTags: TAG,
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
  useLazyGetCampaignsListAsExportQuery,
} = socialMarketerAPI;
