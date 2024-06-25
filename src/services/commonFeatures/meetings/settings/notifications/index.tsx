import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'MEETINGS_NOTIFICATION_SETTINGS';

export const meetingsNotificationSettingsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getMeetingsSettingsNotification: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.SERVICES_GET_EMAIL_NOTIFICATION,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),

    patchMeetingsSettingsNotification: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.SERVICES_PATCH_EMAIL_NOTIFICATION}/${apiDataParameter?.pathParams?.accountId}`,
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetMeetingsSettingsNotificationQuery,
  usePatchMeetingsSettingsNotificationMutation,
} = meetingsNotificationSettingsAPI;
