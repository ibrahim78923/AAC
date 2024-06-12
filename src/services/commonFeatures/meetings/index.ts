import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const TAGS = 'TIME_SLOTS';
export const meetingApi = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    postTimeSlots: builder?.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.TIME_SLOTS}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAGS],
    }),
  }),
});

export const { usePostTimeSlotsMutation } = meetingApi;
