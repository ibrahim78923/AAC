import { END_POINTS, OPERATION } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'DATA_MANAGEMENT_EXPORT';

export const dataManagementExportAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getExportList: builder?.query({
      query: (params) => ({
        url: `${OPERATION}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
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
      providesTags: [TAG],
    }),
  }),
});

export const { useGetExportListQuery, useLazyGetUsersDropdownListQuery } =
  dataManagementExportAPI;
