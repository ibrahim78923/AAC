import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'BUSINESS_HOUR';

export const businessHourAPI: any = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessHour: builder?.query({
      query: () => ({
        url: `${END_POINTS?.GET_BUSINESS_HOUR}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    deleteBusinessHour: builder?.mutation({
      query: (deleteBusinessHourParameter: any) => ({
        url: `${END_POINTS?.DELETE_BUSINESS_HOUR}`,
        method: 'DELETE',
        params: deleteBusinessHourParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { useGetBusinessHourQuery, useDeleteBusinessHourMutation } =
  businessHourAPI;
