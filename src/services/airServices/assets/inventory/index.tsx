import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
import { transformResponse } from '@/utils/api';

const TAG = 'ASSETS_INVENTORY';
const TAG_TWO = 'DROPDOWN_ASSET_TYPE_LIST';
const TAG_FOUR = 'DROPDOWN_DEPARTMENT';

export const inventoryAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getInventory: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),

    getExportInventory: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
      providesTags: [TAG],
    }),

    postInventory: builder?.mutation({
      query: (postInventoryParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}`,
        method: 'POST',
        body: postInventoryParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    putInventory: builder?.mutation({
      query: (putInventoryParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}/${putInventoryParameter?.pathParam?.id}`,
        method: 'PUT',
        body: putInventoryParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    deleteInventory: builder?.mutation({
      query: (deleteInventoryParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY}`,
        method: 'DELETE',
        params: deleteInventoryParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    getAssetType: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_ASSET_TYPE_LIST}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => transformResponse(response),
      providesTags: [TAG_TWO],
    }),
    getDepartmentDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_DEPARTMENT}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.departments;
      },
      providesTags: [TAG_FOUR],
    }),
    getLocationsDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_LOCATION}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_FOUR],
    }),
    getUsersDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_LOCATION}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_FOUR],
    }),
  }),
});

export const {
  usePostInventoryMutation,
  useGetInventoryQuery,
  useDeleteInventoryMutation,
  usePutInventoryMutation,
  useLazyGetInventoryQuery,
  useLazyGetExportInventoryQuery,
  useLazyGetAssetTypeQuery,
  useLazyGetUsersDropdownQuery,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetLocationsDropdownQuery,
} = inventoryAPI;
