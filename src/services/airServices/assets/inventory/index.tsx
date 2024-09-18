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
    getAssetsInventoryDepartmentDropdown: builder?.query({
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
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_FOUR],
    }),
    getAddToInventoryById: builder?.query({
      query: (getSingleAddToInventoryParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY_DETAIL}/${getSingleAddToInventoryParameter?.pathParam?.inventoryId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    patchAddToInventory: builder?.mutation({
      query: (putAddToInventoryParameter: any) => ({
        url: `${END_POINTS?.ASSETS_EDIT_INVENTORY}`,
        method: 'PATCH',
        body: putAddToInventoryParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getAttachmentToInventory: builder?.query({
      query: (getAttachmentToInventoryParameter: any) => ({
        url: `${END_POINTS?.ATTACHMENT_INVENTORY}/${getAttachmentToInventoryParameter?.pathParam?.inventoryId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getAssetTypeInventoryDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.ASSET_TYPE_DROPDOWN,
        method: 'GET',
        params,
      }),
      providesTags: [TAG_TWO],
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
  useLazyGetAssetsInventoryDepartmentDropdownQuery,
  useLazyGetLocationsDropdownQuery,
  usePatchAddToInventoryMutation,
  useGetAddToInventoryByIdQuery,
  useGetAttachmentToInventoryQuery,
  useLazyGetAssetTypeInventoryDropdownQuery,
} = inventoryAPI;
