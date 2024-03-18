import { settingSalesProductCategory } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const salesProductCategoriesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postSalesProductCategories: builder.mutation({
      query: ({ body }: any) => ({
        url: `${settingSalesProductCategory.POST_SALES_PRODUCT_CATEGORY}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['SettingSalesProductCategories'],
    }),
    getSalesProductCategories: builder.query({
      query: ({ params }: any) => ({
        url: `${settingSalesProductCategory.GET_SALES_PRODUCT_CATEGORY}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['SettingSalesProductCategories'],
    }),
    updateSalesProductCategories: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${settingSalesProductCategory.GET_SALES_PRODUCT_CATEGORY}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['SettingSalesProductCategories'],
    }),
  }),
});

export const {
  usePostSalesProductCategoriesMutation,
  useGetSalesProductCategoriesQuery,
  useUpdateSalesProductCategoriesMutation,
} = salesProductCategoriesAPI;
