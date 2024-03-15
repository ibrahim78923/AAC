import { settingLifeCycleStage } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const lifeCycleStageAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postSettingLifeCycleStage: builder.mutation({
      query: ({ body }: any) => ({
        url: `${settingLifeCycleStage.POST_LIFE_CYCLE_STAGE}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['SettingLifeCycleStage'],
    }),
    getSettingLifeCycleStage: builder.query({
      query: ({ params }: any) => ({
        url: `${settingLifeCycleStage.GET_LIFE_CYCLE_STAGE}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['SettingLifeCycleStage'],
    }),
    updateSettingLifeCycleStage: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${settingLifeCycleStage.UPDATE_LIFE_CYCLE_STAGE}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['SettingLifeCycleStage'],
    }),
    deleteSettingLifeCycleStage: builder.mutation({
      query: ({ id }) => ({
        url: `${settingLifeCycleStage.DELETE_LIFE_CYCLE_STAGE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SettingLifeCycleStage'],
    }),
  }),
});

export const {
  usePostSettingLifeCycleStageMutation,
  useGetSettingLifeCycleStageQuery,
  useUpdateSettingLifeCycleStageMutation,
  useDeleteSettingLifeCycleStageMutation,
} = lifeCycleStageAPI;
