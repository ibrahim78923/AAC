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
      query: ({ params }) => ({
        url: `${END_POINTS?.DROPDOWN_ORGANIZATIONS}/${params?.id}/users`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.users;
      },
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
    getContactDropdown: builder?.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.CONTACTS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.contacts;
      },
      providesTags: [TAG],
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useLazyGetOrganizationsQuery,
  useLazyGetProductsQuery,
  useLazyGetFoldersQuery,
  useLazyGetAgentsQuery,
  useGetOrganizationUsersQuery,
  useLazyGetOrganizationUsersQuery,
  useLazyGetContactDropdownQuery,
} = dropdownsAPI;
