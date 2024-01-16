import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'ASSETS_SOFTWARE';
const TAG_ONE = 'DROPDOWN_AGENT_LIST';
const TAG_TWO = 'GET_SOFTWARE_DETAIL';

export const assetsSoftwareAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getAssetsSoftware: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ASSETS_SOFTWARE}`,
        method: 'GET',
        params: apiDataParameter,
      }),
      providesTags: [TAG],
    }),
    putSoftwareAssignCategory: builder?.mutation({
      query: (putAssignCategoryParameter: any) => {
        const assignCategoryIds =
          putAssignCategoryParameter?.ids?.join('&ids=');
        return {
          url: `${END_POINTS?.SOFTWARE_ASSIGN_CATEGORY}?ids=${assignCategoryIds}`,
          method: 'PUT',
          body: putAssignCategoryParameter?.body,
        };
      },
      invalidatesTags: [TAG],
    }),
    getCategoriesDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_CATEGORIES}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.servicecategories;
      },
      providesTags: [TAG],
    }),
    postSoftware: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.ADD_SOFTWARE}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    putSoftware: builder?.mutation({
      query: (params: any) => ({
        url: `${END_POINTS?.EDIT_SOFTWARE}/${params?.id}`,
        method: 'PUT',
        body: params?.body,
      }),
      invalidatesTags: [TAG],
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getAgentsDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_AGENTS_LIST}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_ONE],
    }),
    getSoftwareById: builder?.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_SOFTWARE_DETAIL}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG_TWO],
    }),
  }),
});

export const {
  useGetAssetsSoftwareQuery,
  useLazyGetCategoriesDropdownQuery,
  usePutSoftwareAssignCategoryMutation,
  usePostSoftwareMutation,
  useLazyGetAgentsDropdownQuery,
  usePutSoftwareMutation,
  useLazyGetSoftwareByIdQuery,
} = assetsSoftwareAPI;
