import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'BUSINESS_HOUR';

export const businessHourAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getAirServicesSettingsServiceBusinessHour: builder?.query({
      query: () => ({
        url: END_POINTS?.GET_BUSINESS_HOUR,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),

    getAirServicesSettingsServiceBusinessHourById: builder?.query({
      query: (businessHourId: any) => ({
        url: `${END_POINTS?.BUSINESS_HOUR}/${businessHourId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),

    postAirServicesSettingsServiceBusinessHour: builder?.mutation({
      query: (postBusinessHourParameter: any) => ({
        url: END_POINTS?.ADD_BUSINESS_HOUR,
        method: 'POST',
        body: postBusinessHourParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    patchAirServicesSettingsServiceBusinessHour: builder?.mutation({
      query: (patchBusinessHourParameter: any) => ({
        url: END_POINTS?.UPDATE_BUSINESS_HOUR,
        method: 'PATCH',
        body: patchBusinessHourParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    deleteAirServicesSettingsServiceBusinessHour: builder?.mutation({
      query: (deleteBusinessHourParameter: any) => ({
        url: END_POINTS?.DELETE_BUSINESS_HOUR,
        method: 'DELETE',
        params: deleteBusinessHourParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),

    getAirServicesSettingsServiceBusinessHourHolidays: builder?.query({
      query: (apiDataParameter) => ({
        url: END_POINTS?.GET_HOLIDAYS,
        method: 'GET',
        params: apiDataParameter,
      }),
      providesTags: [TAG],
    }),

    postAirServicesSettingsServiceBusinessHourHoliday: builder?.mutation({
      query: (postHolidayParameter: any) => ({
        url: END_POINTS?.ADD_HOLIDAY,
        method: 'POST',
        body: postHolidayParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    deleteAirServicesSettingsServiceBusinessHourHoliday: builder?.mutation({
      query: (deleteHolidayParameter: any) => ({
        url: END_POINTS?.DELETE_HOLIDAY,
        method: 'DELETE',
        params: deleteHolidayParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetAirServicesSettingsServiceBusinessHourQuery,
  useDeleteAirServicesSettingsServiceBusinessHourMutation,
  usePostAirServicesSettingsServiceBusinessHourMutation,
  usePatchAirServicesSettingsServiceBusinessHourMutation,
  useGetAirServicesSettingsServiceBusinessHourByIdQuery,
  useLazyGetAirServicesSettingsServiceBusinessHourHolidaysQuery,
  usePostAirServicesSettingsServiceBusinessHourHolidayMutation,
  useDeleteAirServicesSettingsServiceBusinessHourHolidayMutation,
} = businessHourAPI;
