import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
import { transformResponse } from '@/utils/api';

const TAGS = 'SOFTWARE';

export const deleteSoftwareAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    deleteSoftware: builder?.mutation({
      query: (id: any) => ({
        url: `${END_POINTS?.DELETE_SOFTWARE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAGS],
    }),
  }),
});

export const { useDeleteSoftwareMutation } = deleteSoftwareAPI;
const TAG = 'ASSETS_SOFTWARE';
const TAG_TWO = 'USERS_DROPDOWN';

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
      query: (body) => ({
        url: `${END_POINTS?.ADD_SOFTWARE}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    editSoftware: builder?.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.EDIT_SOFTWARE}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    getSoftwareById: builder?.query({
      query: (params) => ({
        url: `${END_POINTS?.GET_SOFTWARE_DETAIL}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    getUserDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse,
      providesTags: [TAG_TWO],
    }),
  }),
});

export const {
  useGetAssetsSoftwareQuery,
  useLazyGetCategoriesDropdownQuery,
  usePutSoftwareAssignCategoryMutation,
  usePostSoftwareMutation,
  useEditSoftwareMutation,
  useLazyGetUserDropdownQuery,
  useLazyGetSoftwareByIdQuery,
} = assetsSoftwareAPI;
