import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'SOFTWARE_INSTALLATION';

export const installationAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    postInstallation: builder?.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.ADD_SOFTWARE_INSTALLATION}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getAssetsDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_ASSETS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getInstallationById: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.SOFTWARE_INSTALLATION}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    getExportInstallation: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.SOFTWARE_INSTALLATION}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
      providesTags: [TAG],
    }),
    removeInstallation: builder?.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.REMOVE_SOFTWARE_INSTALLATION,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});
export const {
  useLazyGetInstallationByIdQuery,
  useLazyGetExportInstallationQuery,
  useLazyGetAssetsDropdownQuery,
  usePostInstallationMutation,
  useRemoveInstallationMutation,
} = installationAPI;
