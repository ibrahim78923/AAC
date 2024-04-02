import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

export const SettingNotificationsAPI: any = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSettingNotifications: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.GET_SETTING_NOTIFICATIONS,
        method: 'GET',
        params: params,
      }),
      providesTags: ['SETTING_NOTIFICATIONS'],
    }),

    updateSettingNotifications: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.UPDATE_SETTING_NOTIFICATIONS}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: ['SETTING_NOTIFICATIONS'],
    }),
  }),
});

export const {
  useGetSettingNotificationsQuery,
  useUpdateSettingNotificationsMutation,
} = SettingNotificationsAPI;
