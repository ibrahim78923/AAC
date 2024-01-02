import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'BUSINESS_HOUR';
const TAG1 = 'HOLIDAYS';
const TAG2 = 'BUSINESS_HOUR_BY_ID';

export const businessHourAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessHour: builder?.query({
      query: () => ({
        url: `${END_POINTS?.GET_BUSINESS_HOUR}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getBusinessHourById: builder?.query({
      query: (businessHourId: any) => ({
        url: `${END_POINTS?.BUSINESS_HOUR}/${businessHourId}`,
        method: 'GET',
      }),
      providesTags: [TAG2],
    }),
    postBusinessHour: builder?.mutation({
      query: (postBusinessHourParameter: any) => ({
        url: `${END_POINTS?.ADD_BUSINESS_HOUR}`,
        method: 'POST',
        body: postBusinessHourParameter?.body,
      }),
    }),
    patchBusinessHour: builder?.mutation({
      query: (patchBusinessHourParameter: any) => ({
        url: `${END_POINTS?.UPDATE_BUSINESS_HOUR}`,
        method: 'PATCH',
        body: patchBusinessHourParameter?.body,
      }),
    }),
    deleteBusinessHour: builder?.mutation({
      query: (deleteBusinessHourParameter: any) => ({
        url: `${END_POINTS?.DELETE_BUSINESS_HOUR}`,
        method: 'DELETE',
        params: deleteBusinessHourParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    getHolidays: builder?.query({
      query: (apiDataParameter) => ({
        url: `${END_POINTS?.GET_HOLIDAYS}`,
        method: 'GET',
        params: apiDataParameter,
      }),
      providesTags: [TAG1],
    }),
    postHoliday: builder?.mutation({
      query: (postHolidayParameter: any) => ({
        url: `${END_POINTS?.ADD_HOLIDAY}`,
        method: 'POST',
        body: postHolidayParameter?.body,
      }),
      invalidatesTags: [TAG2],
    }),
    deleteHoliday: builder?.mutation({
      query: (deleteHolidayParameter: any) => ({
        url: `${END_POINTS?.DELETE_HOLIDAY}`,
        method: 'DELETE',
        params: deleteHolidayParameter?.queryParams,
      }),
      invalidatesTags: [TAG2],
    }),
  }),
});

export const {
  useGetBusinessHourQuery,
  useDeleteBusinessHourMutation,
  usePostBusinessHourMutation,
  usePatchBusinessHourMutation,
  useGetBusinessHourByIdQuery,
  useLazyGetHolidaysQuery,
  usePostHolidayMutation,
  useDeleteHolidayMutation,
} = businessHourAPI;
