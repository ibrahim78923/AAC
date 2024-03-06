import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'DROPDOWNS';

const transformResponse = (response: any) => {
  if (response) return response?.data;
};

export const dropdownsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_ORGANIZATIONS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => transformResponse(response),
      providesTags: [TAG],
    }),
    getOrganizationUsers: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.DROPDOWN_ORGANIZATIONS}/${id}/users`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getProducts: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_PRODUCTS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => transformResponse(response),
      providesTags: [TAG],
    }),

    getFolders: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_FOLDERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => transformResponse(response),
      providesTags: [TAG],
    }),

    getAgents: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.AGENTS_DROPDOWN}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => transformResponse(response),
      providesTags: [TAG],
    }),
  }),
});

export const {
  useLazyGetOrganizationsQuery,
  useLazyGetProductsQuery,
  useLazyGetFoldersQuery,
  useLazyGetAgentsQuery,
  useGetOrganizationUsersQuery,
} = dropdownsAPI;
