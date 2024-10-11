import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'EMAIL_NOTIFICATION';

export const emailNotificationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getServicesAccountSettingsEmailNotification: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.SERVICES_GET_EMAIL_NOTIFICATION,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),

    patchServicesAccountSettingsEmailNotification: builder?.mutation({
      query: (patchData: any) => ({
        url: `${END_POINTS?.SERVICES_PATCH_EMAIL_NOTIFICATION}/${patchData?.accountId}`,
        method: 'PATCH',
        body: patchData?.data,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetServicesAccountSettingsEmailNotificationQuery,
  usePatchServicesAccountSettingsEmailNotificationMutation,
} = emailNotificationAPI;
