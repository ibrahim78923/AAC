import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

const TAG = ['AIR_SALES_QUOTES'];
export const quotesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDeals: builder.query({
      query: ({ params }) => ({
        url: '/deals/get-deals-list-view',
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getQuotes: builder.query({
      query: ({ params }) => ({
        url: END_POINTS?.QUOTES,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getQuoteById: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.QUOTES}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    postQuote: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.QUOTE_CREATE,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    updateQuote: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.QUOTES}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    deleteQuotes: builder.mutation({
      query: (id: any) => ({
        url: `${END_POINTS?.QUOTES}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetDealsQuery,
  useGetQuotesQuery,
  useGetQuoteByIdQuery,
  useUpdateQuoteMutation,
  usePostQuoteMutation,
  useDeleteQuotesMutation,
} = quotesAPI;
