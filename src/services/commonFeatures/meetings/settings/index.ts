import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const TAGS = 'MEETINGS_CALENDARS';
const GOOGLE_TAG = 'GOOGLE_CALENDAR_AUTH';
const OFFICE_TAG = 'OFFICE_CALENDAR_AUTH';
const TEAMS_TAG = 'MS_TEAMS_AUTH';
const GOOGLE_MEET_TAG = 'GOOGLE_MEET_AUTH';

export const meetingSettingsApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getGoogleCalendarAuth: builder?.query({
      query: () => ({
        url: `${END_POINTS?.GET_GOOGLE_CALENDAR}`,
        method: 'GET',
      }),
      providesTags: [GOOGLE_TAG],
    }),
    getMeetingsCalendarsList: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_CALENDARS}`,
        method: 'GET',
        params,
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
    getOfficeCalendarAuth: builder?.query({
      query: () => ({
        url: `${END_POINTS?.GET_OFFICE_365_CALENDAR}`,
        method: 'GET',
      }),
      providesTags: [OFFICE_TAG],
    }),
    getMsTeamsAuth: builder?.query({
      query: () => ({
        url: `${END_POINTS?.GET_MS_TEAMS}`,
        method: 'GET',
      }),
      providesTags: [TEAMS_TAG],
    }),
    getGoogleMeetAuth: builder?.query({
      query: () => ({
        url: `${END_POINTS?.GET_GOOGLE_MEET}`,
        method: 'GET',
      }),
      providesTags: [GOOGLE_MEET_TAG],
    }),
  }),
});

export const {
  useGetGoogleCalendarAuthQuery,
  useGetMeetingsCalendarsListQuery,
  useChangeStatusCalendarMutation,
  useDeleteCalendarMutation,
  useGetOfficeCalendarAuthQuery,
  useGetMsTeamsAuthQuery,
  useGetGoogleMeetAuthQuery,
} = meetingSettingsApi;
