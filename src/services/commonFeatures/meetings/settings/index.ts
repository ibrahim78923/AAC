import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const TAGS = 'MEETINGS_CALENDARS';
const GOOGLE_TAG = 'GOOGLE_CALENDAR_AUTH';
export const meetingSettingsApi = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getGoogleCalendarAuth: builder?.query({
      query: () => ({
        url: `${END_POINTS?.GET_GOOGLE_CALENDAR}`,
        method: 'GET',
      }),
      providesTags: [GOOGLE_TAG],
    }),
    getMeetingsCalendarsList: builder?.query({
      query: () => ({
        url: `${END_POINTS?.GET_CALENDARS}`,
        method: 'GET',
      }),
      providesTags: [TAGS],
    }),
    changeStatusCalendar: builder?.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.CALENDARS_STATUS}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAGS],
    }),
    deleteCalendar: builder?.mutation({
      query: (params: any) => ({
        url: `${END_POINTS?.CALENDARS_STATUS}`,
        method: 'DELETE',
        params,
      }),
      invalidatesTags: [TAGS],
    }),
  }),
});

export const {
  useGetGoogleCalendarAuthQuery,
  useGetMeetingsCalendarsListQuery,
  useChangeStatusCalendarMutation,
  useDeleteCalendarMutation,
} = meetingSettingsApi;
