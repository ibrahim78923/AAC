import { baseAPI } from '@/services/base-api';
import { SUPER_ADMIN_SETTINGS } from '@/routesConstants/paths';
import { END_POINTS } from '@/routesConstants/endpoints';

const TAG = ['SETTINGS_PRODUCT_FEATURES'];
export const settingsProductFeaturesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProductFeature: builder.query({
      query: ({ params }) => ({
        url: SUPER_ADMIN_SETTINGS?.PRODUCT_FEATURES,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getProductFeatureById: builder.query({
      query: (id: any) => ({
        url: `${SUPER_ADMIN_SETTINGS?.PRODUCT_FEATURES}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    postProductFeature: builder.mutation({
      query: ({ body }: any) => ({
        url: SUPER_ADMIN_SETTINGS?.PRODUCT_FEATURES,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    updateProductFeature: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${SUPER_ADMIN_SETTINGS?.PRODUCT_FEATURES}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    deleteProductFeature: builder.mutation({
      query: (id: any) => ({
        url: `${SUPER_ADMIN_SETTINGS?.PRODUCT_FEATURES}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),

    getProductFeatureProductList: builder.query({
      query: ({ params }) => ({
        url: END_POINTS?.DROPDOWN_PRODUCTS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: ['AAC_PRODUCTS'],
    }),
  }),
});

export const {
  useGetProductFeatureQuery,
  useGetProductFeatureByIdQuery,
  useUpdateProductFeatureMutation,
  usePostProductFeatureMutation,
  useDeleteProductFeatureMutation,
  useLazyGetProductFeatureProductListQuery,
} = settingsProductFeaturesAPI;
