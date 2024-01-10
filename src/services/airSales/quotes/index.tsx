import { baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

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
      query: ({ id }: any) => ({
        url: `${END_POINTS?.QUOTE}/${id}`,
        method: 'GET',
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
    getCompaniesOwners: builder.query({
      query: () => ({
        url: END_POINTS?.COMPANIES_OWNER,
        method: 'GET',
      }),
      // providesTags: TAG,
    }),
    getUsersList: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.USERS_LIST_ADMIN}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['DEALS'],
    }),
  }),
});

export const {
  useGetDealsQuery,
  useGetQuotesQuery,
  useGetQuoteByIdQuery,
  useUpdateQuoteMutation,
  usePostQuoteMutation,
  usePostCompaniesMutation,
  useDeleteQuotesMutation,
  useGetUserListQuery,
  useGetCompaniesOwnersQuery,
  useGetUsersListQuery,
} = quotesAPI;
