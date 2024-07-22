import { END_POINTS, OPERATION } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'DATA_MANAGEMENT_IMPORT';

export const dataManagementImportAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getImportList: builder?.query({
      query: (params) => ({
        url: `${OPERATION?.GET_IMPORT_DATA_MANAGEMENT}`,
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

export const { useGetImportListQuery, useLazyGetUsersDropdownListQuery } =
  dataManagementImportAPI;
