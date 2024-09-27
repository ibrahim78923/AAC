import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
import { transformResponse } from '@/utils/api';

const TAG = 'ASSETS_INVENTORY';
const TAG_TWO = 'DROPDOWN_ASSET_TYPE_LIST';
const TAG_FOUR = 'DROPDOWN_DEPARTMENT';

export const inventoryAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getAirServicesAssetsInventory: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.ASSETS_INVENTORY,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),

    getAirServicesAssetsExportInventory: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.ASSETS_INVENTORY,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
      }),
      providesTags: [TAG],
    }),

    postAirServicesAssetsInventory: builder?.mutation({
      query: (postInventoryParameter: any) => ({
        url: END_POINTS?.ASSETS_INVENTORY,
        method: 'POST',
        body: postInventoryParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    deleteAirServicesAssetsInventory: builder?.mutation({
      query: (deleteInventoryParameter: any) => ({
        url: END_POINTS?.ASSETS_INVENTORY,
        method: 'DELETE',
        params: deleteInventoryParameter?.queryParams,
      }),
    }),
    getAirServicesAssetsInventoryAssetType: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DROPDOWN_ASSET_TYPE_LIST,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => transformResponse(response),
      providesTags: [TAG_TWO],
    }),
    getAirServicesAssetsInventoryDepartmentDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DROPDOWN_DEPARTMENT,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.departments;
      },
      providesTags: [TAG_FOUR],
    }),
    getAirServicesAssetsInventoryLocationsDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DROPDOWN_LOCATION,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_FOUR],
    }),
    getAirServicesAssetsInventoryUsersDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DROPDOWN_USERS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_FOUR],
    }),
    getAirServicesAssetsInventoryAddToInventoryById: builder?.query({
      query: (getSingleAddToInventoryParameter: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY_DETAIL}/${getSingleAddToInventoryParameter?.pathParam?.inventoryId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    patchAirServicesAssetsInventoryAddToInventory: builder?.mutation({
      query: (putAddToInventoryParameter: any) => ({
        url: END_POINTS?.ASSETS_EDIT_INVENTORY,
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
    getAirServicesAssetsInventoryAssetTypeInventoryDropdown: builder?.query({
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
  usePostAirServicesAssetsInventoryMutation,
  useDeleteAirServicesAssetsInventoryMutation,
  useLazyGetAirServicesAssetsInventoryQuery,
  useLazyGetAirServicesAssetsExportInventoryQuery,
  useLazyGetAirServicesAssetsInventoryAssetTypeQuery,
  useLazyGetAirServicesAssetsInventoryUsersDropdownQuery,
  useLazyGetAirServicesAssetsInventoryDepartmentDropdownQuery,
  useLazyGetAirServicesAssetsInventoryLocationsDropdownQuery,
  usePatchAirServicesAssetsInventoryAddToInventoryMutation,
  useGetAirServicesAssetsInventoryAddToInventoryByIdQuery,
  useGetAttachmentToInventoryQuery,
  useLazyGetAirServicesAssetsInventoryAssetTypeInventoryDropdownQuery,
} = inventoryAPI;
