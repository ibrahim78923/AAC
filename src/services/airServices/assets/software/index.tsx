import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

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
  }),
});

export const {
  useGetAssetsSoftwareQuery,
  useLazyGetCategoriesDropdownQuery,
  usePutSoftwareAssignCategoryMutation,
} = assetsSoftwareAPI;
