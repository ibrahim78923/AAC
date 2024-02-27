import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const receiversBankAccountsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getReceiverBankAccounts: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_RECEIVERS_BANK_ACCOUNTS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['RECEIVER_BANK_ACCOUNT'],
    }),

    getReceiverBankAccountsById: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.GET_RECEIVERS_BANK_ACCOUNTS}/${id}`,
        method: 'GET',
      }),
      providesTags: ['RECEIVER_BANK_ACCOUNT'],
    }),

    postReceiverBankAccount: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.GET_RECEIVERS_BANK_ACCOUNTS}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['RECEIVER_BANK_ACCOUNT'],
    }),

    updateReceiverBankAccount: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.GET_RECEIVERS_BANK_ACCOUNTS}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['RECEIVER_BANK_ACCOUNT'],
    }),

    deleteReceiverBankAccount: builder.mutation({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.GET_RECEIVERS_BANK_ACCOUNTS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['RECEIVER_BANK_ACCOUNT'],
    }),
  }),
});

export const {
  useGetReceiverBankAccountsQuery,
  useDeleteReceiverBankAccountMutation,
  usePostReceiverBankAccountMutation,
  useUpdateReceiverBankAccountMutation,
  useGetReceiverBankAccountsByIdQuery,
} = receiversBankAccountsAPI;
