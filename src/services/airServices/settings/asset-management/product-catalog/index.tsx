import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
import { transformResponse } from '@/utils/api';

const TAG = 'PRODUCT_CATALOG';
const TAG_TWO = 'DROPDOWN_ASSET_TYPE_LIST';

export const productCatalogAPI: any = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getProductCatalog: builder?.query({
      query: (getProductCatalogParameter: any) => ({
        url: `${END_POINTS?.PRODUCT_CATALOG_LIST}`,
        method: 'GET',
        params: getProductCatalogParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),

    getProductCatalogById: builder?.query({
      query: (getSingleProductCatalogParameter: any) => ({
        url: `${END_POINTS?.PRODUCT_CATALOG}/${getSingleProductCatalogParameter?.pathParam?.productCatalogId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),

    getExportProductCatalog: builder?.query({
      query: (getExportProductCatalogParameter: any) => ({
        url: `${END_POINTS?.PRODUCT_CATALOG_LIST}`,
        method: 'GET',
        params: getExportProductCatalogParameter?.queryParams,
        responseHandler: (response: { text: () => any }) => response?.text(),
      }),
      providesTags: [TAG],
    }),

    postProductCatalog: builder?.mutation({
      query: (postProductCatalogParameter: any) => ({
        url: `${END_POINTS?.PRODUCT_CATALOG}`,
        method: 'POST',
        body: postProductCatalogParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    patchProductCatalog: builder?.mutation({
      query: (putProductCatalogParameter: any) => ({
        url: `${END_POINTS?.EDIT_PRODUCT_CATALOG}`,
        method: 'PATCH',
        body: putProductCatalogParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    deleteProductCatalog: builder?.mutation({
      query: (deleteProductCatalogParameter: any) => ({
        url: `${END_POINTS?.DELETE_PRODUCT_CATALOG}`,
        method: 'DELETE',
        params: deleteProductCatalogParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),

    // Vendors Tab
    getProductCatalogVendorList: builder?.query({
      query: (getProductCatalogVendorParameter: any) => ({
        url: `${END_POINTS?.PRODUCT_CATALOG_VENDOR_LIST}`,
        method: 'GET',
        params: getProductCatalogVendorParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),

    deleteProductCatalogVendor: builder?.mutation({
      query: (deleteVendorParameter: any) => ({
        url: `${END_POINTS?.DELETE_PRODUCT_CATALOG_VENDOR}`,
        method: 'DELETE',
        params: deleteVendorParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),

    //dropdowns
    getAssetType: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_ASSET_TYPE_LIST}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => transformResponse(response),
      providesTags: [TAG_TWO],
    }),
  }),
});

export const {
  useGetProductCatalogQuery,
  useLazyGetProductCatalogQuery,
  useGetProductCatalogByIdQuery,
  usePostProductCatalogMutation,
  usePatchProductCatalogMutation,
  useDeleteProductCatalogMutation,
  useLazyGetExportProductCatalogQuery,
  useGetProductCatalogVendorListQuery,
  useDeleteProductCatalogVendorMutation,
  useLazyGetAssetTypeQuery,
} = productCatalogAPI;
