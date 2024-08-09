import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const TAGS = 'TIME_SLOTS';
const MEETINGS_TAG = 'MEETINGS';
const LOCATION_TAG = 'MEETINGS_LOCATIONS';
export const meetingApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getTimeSlots: builder?.query({
      query: () => ({
        url: `${END_POINTS?.GET_TIME_SLOTS}`,
        method: 'GET',
      }),
      providesTags: [TAGS],
    }),
    postTimeSlots: builder?.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.TIME_SLOTS}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAGS],
    }),
    addMeeting: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.ADD_MEETING}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [MEETINGS_TAG],
    }),
    getLocationList: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_MEETINGS_LOCATIONS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.meetinglocations ?? [];
      },
      providesTags: [LOCATION_TAG],
    }),
    addMeetingTemplate: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.MEETINGS_TEMPLATE}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [MEETINGS_TAG],
    }),
    updateMeeting: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.POST_MEETINGS}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [MEETINGS_TAG],
    }),
    getMeetingsList: builder?.query({
      query: (meetingParameter: any) => ({
        url: `${END_POINTS?.GET_MEETINGS_LIST}`,
        method: 'GET',
        params: meetingParameter?.queryParams,
      }),
      providesTags: [MEETINGS_TAG],
    }),
    getByIdMeetingsList: builder?.query({
      query: (id: any) => ({
        url: `${END_POINTS?.GET_BY_ID_MEETINGS}/${id}`,
        method: 'GET',
      }),
      providesTags: [MEETINGS_TAG],
    }),
    deleteMeetings: builder?.mutation({
      query: (meetingParameter: any) => ({
        url: `${END_POINTS?.DELETE_MEETINGS}`,
        method: 'DELETE',
        params: meetingParameter?.queryParams,
      }),
      invalidatesTags: [MEETINGS_TAG],
    }),
    getMeetingsSlotsList: builder?.query({
      query: (meetingParameter: any) => ({
        url: `${END_POINTS?.GET_MEETINGS_SLOTS}`,
        method: 'GET',
        params: meetingParameter?.queryParams,
      }),
      providesTags: [MEETINGS_TAG],
    }),
    getBookedMeetingsSlotsList: builder?.query({
      query: (meetingParameter: any) => ({
        url: `${END_POINTS?.GET_BOOKED_MEETINGS_SLOTS}`,
        method: 'GET',
        params: meetingParameter?.queryParams,
      }),
      providesTags: [MEETINGS_TAG],
    }),
    getMeetingsCalenderList: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_MEETINGS_LIST}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response)
          return (
            {
              allMeetings: response?.data?.allMeetings,
              upCommings: response?.data?.upCommings,
              completed: response?.data?.completed,
              data: response?.data?.meetings?.map((item: any) => ({
                start: item?.startDate,
                end: item?.endDate,
                title: item?.title,
                extendedProps: {
                  _id: item?._id,
                  userName: `${item?.userDetails?.firstName} ${item?.userDetails?.lastName}`,
                  joinUrl: item?.joinUrl,
                  email: item?.userDetails?.email,
                  type: item?.category,
                  platform: item?.type,
                  avatar: item?.userDetails?.avatar?.url,
                  people: item?.peoples,
                  startTime: item?.startTime,
                  endTime: item?.endTime,
                  startDate: item?.startDate,
                },
              })),
            } ?? []
          );
      },
      providesTags: [MEETINGS_TAG],
    }),
    getUsersDropdownList: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
  }),
});

export const {
  usePostTimeSlotsMutation,
  useGetTimeSlotsQuery,
  useAddMeetingMutation,
  useLazyGetLocationListQuery,
  useAddMeetingTemplateMutation,
  useUpdateMeetingMutation,
  useGetMeetingsListQuery,
  useLazyGetMeetingsListQuery,
  useGetByIdMeetingsListQuery,
  useDeleteMeetingsMutation,
  useGetMeetingsSlotsListQuery,
  useLazyGetMeetingsSlotsListQuery,
  useLazyGetMeetingsCalenderListQuery,
  useLazyGetUsersDropdownListQuery,
  useLazyGetBookedMeetingsSlotsListQuery,
} = meetingApi;
