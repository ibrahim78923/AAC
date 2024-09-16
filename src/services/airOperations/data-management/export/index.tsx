import { END_POINTS, OPERATION } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'DATA_MANAGEMENT_EXPORT';

export const dataManagementExportAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getExportList: builder?.query({
      query: (params) => ({
        url: `${OPERATION?.GET_EXPORT_DATA_MANAGEMENT}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    exportList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${OPERATION?.GET_EXPORT_DATA_MANAGEMENT}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
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

export const {
  useGetExportListQuery,
  useLazyGetUsersDropdownListQuery,
  useLazyExportListQuery,
} = dataManagementExportAPI;
