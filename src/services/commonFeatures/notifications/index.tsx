import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const NOTIFICATIONS = ['SETTING_NOTIFICATIONS'];

export const usersApi: any = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.HEADER_NOTIFICATIONS,
        method: 'GET',
        params: params,
      }),
      providesTags: NOTIFICATIONS,
    }),

    seenNotification: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.SEEN_NOTIFICATIONS}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: NOTIFICATIONS,
    }),
  }),
});

export const { useGetNotificationsQuery, useSeenNotificationMutation } =
  usersApi;
