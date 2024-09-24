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
        params: {
          meta: params?.meta,
          search: params?.search,
        },
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
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

    getOrganizationTeams: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_ORG_TEAMS}`,
        method: 'GET',
        params: {
          search: params?.search,
          meta: params?.meta,
        },
      }),
      providesTags: ['ORGANIZATION_TEAMS'],
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
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
  useLazyGetOrganizationTeamsQuery,
} = dropdownsAPI;
