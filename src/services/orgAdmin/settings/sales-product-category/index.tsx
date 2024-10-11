import { settingSalesProductCategory } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['SettingSalesProductCategories'];
export const salesProductCategoriesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postSalesProductCategories: builder.mutation({
      query: ({ body }: any) => ({
        url: `${settingSalesProductCategory.POST_SALES_PRODUCT_CATEGORY}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    getSalesProductCategories: builder.query({
      query: ({ params }: any) => ({
        url: `${settingSalesProductCategory.GET_SALES_PRODUCT_CATEGORY}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    updateSalesProductCategories: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${settingSalesProductCategory.GET_SALES_PRODUCT_CATEGORY}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  usePostSalesProductCategoriesMutation,
  useGetSalesProductCategoriesQuery,
  useUpdateSalesProductCategoriesMutation,
} = salesProductCategoriesAPI;
