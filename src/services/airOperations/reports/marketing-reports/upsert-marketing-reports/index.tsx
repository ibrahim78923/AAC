import { END_POINTS, OPERATION } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = 'UPSERT_MARKETING_REPORT';

export const UpsertMarketingReportApi = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    postMarketingReports: builder?.mutation({
      query: (payload: any) => ({
        url: `${OPERATION?.POST_GENERIC_REPORT}`,
        method: 'POST',
        body: payload,
      }),
      providesTags: [TAG],
    }),
    usersDropdown: builder?.query({
      query: () => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG],
    }),
  }),
});

export const { usePostMarketingReportsMutation, useLazyUsersDropdownQuery } =
  UpsertMarketingReportApi;
