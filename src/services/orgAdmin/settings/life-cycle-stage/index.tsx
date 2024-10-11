import { settingLifeCycleStage } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['SettingLifeCycleStage'];
export const lifeCycleStageAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postSettingLifeCycleStage: builder.mutation({
      query: ({ body }: any) => ({
        url: `${settingLifeCycleStage.POST_LIFE_CYCLE_STAGE}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    getSettingLifeCycleStage: builder.query({
      query: ({ params }: any) => ({
        url: `${settingLifeCycleStage.GET_LIFE_CYCLE_STAGE}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    updateSettingLifeCycleStage: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${settingLifeCycleStage.UPDATE_LIFE_CYCLE_STAGE}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    deleteSettingLifeCycleStage: builder.mutation({
      query: (id) => ({
        url: `${settingLifeCycleStage.DELETE_LIFE_CYCLE_STAGE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  usePostSettingLifeCycleStageMutation,
  useGetSettingLifeCycleStageQuery,
  useUpdateSettingLifeCycleStageMutation,
  useDeleteSettingLifeCycleStageMutation,
} = lifeCycleStageAPI;
