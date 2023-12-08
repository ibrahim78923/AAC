import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'PRODUCT_CATALOG';

export const productCatalogAPI: any = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getProductCatalog: builder?.query({
      query: (getProductCatalogParameter: any) => ({
        url: `${END_POINTS}`,
        method: 'GET',
        params: getProductCatalogParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getProductCatalogById: builder?.query({
      query: (getSingleProductCatalogParameter: any) => ({
        url: `${END_POINTS}/${getSingleProductCatalogParameter?.pathParam?.productCatalogId}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getExportProductCatalog: builder?.query({
      query: (getExportProductCatalogParameter: any) => ({
        url: `${END_POINTS}`,
        method: 'GET',
        params: getExportProductCatalogParameter?.queryParams,
        responseHandler: (response: { text: () => any }) => response?.text(),
      }),
      providesTags: [TAG],
    }),
    postProductCatalog: builder?.mutation({
      query: (postProductCatalogParameter: any) => ({
        url: `${END_POINTS}`,
        method: 'POST',
        body: postProductCatalogParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    putProductCatalog: builder?.mutation({
      query: (putProductCatalogParameter: any) => ({
        url: `${END_POINTS}/${putProductCatalogParameter?.pathParam?.id}`,
        method: 'PUT',
        body: putProductCatalogParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    deleteProductCatalog: builder?.mutation({
      query: (deleteProductCatalogParameter: any) => ({
        url: `${END_POINTS}`,
        method: 'DELETE',
        params: deleteProductCatalogParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetProductCatalogQuery,
  useLazyGetProductCatalogQuery,
  useGetProductCatalogByIdQuery,
  usePostProductCatalogMutation,
  usePutProductCatalogMutation,
  useDeleteProductCatalogMutation,
  useLazyGetExportProductCatalogQuery,
} = productCatalogAPI;
