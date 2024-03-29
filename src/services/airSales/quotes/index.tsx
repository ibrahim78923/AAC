import { baseAPI } from '@/services/base-api';
import {
  END_POINTS,
  settingSalesProductCategory,
} from '@/routesConstants/endpoints';

const TAG = ['AIR_SALES_QUOTES'];
export const quotesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDeals: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.DEALS_LIST_VIEW}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getQuotes: builder.query({
      query: ({ params }) => ({
        url: END_POINTS?.QUOTE,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getQuoteById: builder.query({
      query: ({ id, productSearchKeyword }: any) => ({
        url: `${END_POINTS?.QUOTE}/{id}?id=${id}`,
        method: 'GET',
        params: { productSearchKeyword },
      }),
      providesTags: TAG,
    }),

    postQuote: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.QUOTE,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    updateQuote: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.QUOTE}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    updateQuoteSubmision: builder.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.QUOTE_SUBMIT_WITH_EMAIL}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: TAG,
    }),

    deleteQuotes: builder.mutation({
      query: (id: any) => ({
        url: `${END_POINTS?.QUOTE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),

    getUserList: builder.query({
      query: ({ params }) => ({
        url: END_POINTS?.USERS_LIST_ADMIN,
        method: 'GET',
        params: params,
      }),
      // providesTags: TAG,
    }),

    postCompanies: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.COMPANY,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['COMPANY'],
    }),
    getUsersList: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.USERS_LIST_ADMIN}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['DEALS'],
    }),
    postProduct: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.SALE_PRODUCTS,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
    deleteProducts: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.DELETE_ASSOCIATION}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    postAddbuyerInfo: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.POST_BUYER_INFO,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
    createAssociationQuote: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.CREATE_ASSOCIATION,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    getProductCatagories: builder.query({
      query: () => ({
        url: settingSalesProductCategory.GET_SALES_PRODUCT_CATEGORY,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    getContacts: builder.query({
      query: () => ({
        url: END_POINTS?.CONTACTS,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    getProductsById: builder.query({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.SALE_PRODUCTS}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    getSalesProductlineItem: builder.query({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.SALE_PRODUCTS}`,
        method: 'GET',
        body: body,
      }),
      providesTags: TAG,
    }),

    updateProductById: builder.mutation({
      query: ({ body, id }: any) => ({
        url: `${END_POINTS?.SALE_PRODUCTS}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: TAG,
    }),
    getCustomizeColumn: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.CUSTOMIZE_COLUMNS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    putCustomizedColumns: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.CUSTOMIZE_COLUMNS}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: TAG,
    }),
    deleteCompanies: builder.mutation({
      query: (ids: any) => ({
        url: `${END_POINTS?.COMPANY}/${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
    deleteContacts: builder.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.CONTACTS}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: TAG,
    }),
    putSubmitQuote: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.QUOTE_SUBMIT}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: TAG,
    }),
    updateSubmitEmailQuote: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.QUOTE_SUBMIT_WITH_EMAIL}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetDealsQuery,
  useGetQuotesQuery,
  useGetQuoteByIdQuery,
  useLazyGetQuoteByIdQuery,
  useUpdateQuoteMutation,
  usePostQuoteMutation,
  usePostCompaniesMutation,
  useDeleteQuotesMutation,
  useGetUserListQuery,
  useGetUsersListQuery,
  usePostProductMutation,
  usePostAddbuyerInfoMutation,
  useCreateAssociationQuoteMutation,
  useGetProductCatagoriesQuery,
  useDeleteProductsMutation,
  useGetContactsQuery,
  useGetProductsByIdQuery,
  useLazyGetProductsByIdQuery,
  useUpdateProductByIdMutation,
  usePutCustomizedColumnsMutation,
  useGetCustomizeColumnQuery,
  useDeleteCompaniesMutation,
  useDeleteContactsMutation,
  useGetSalesProductlineItemQuery,
  usePutSubmitQuoteMutation,
  useUpdateSubmitEmailQuoteMutation,
  useUpdateQuoteSubmisionMutation,
} = quotesAPI;
