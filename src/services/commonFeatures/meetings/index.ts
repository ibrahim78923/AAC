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
      query: (meetingParameter: any) => ({
        url: `${END_POINTS?.ADD_MEETING}`,
        method: 'POST',
        body: meetingParameter?.body,
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
  }),
});

export const {
  usePostTimeSlotsMutation,
  useGetTimeSlotsQuery,
  useAddMeetingMutation,
  useLazyGetLocationListQuery,
} = meetingApi;
