import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['RECEIVER_BANK_ACCOUNT'];
export const receiversBankAccountsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getReceiverBankAccounts: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.GET_RECEIVERS_BANK_ACCOUNTS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getReceiverBankAccountsById: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.GET_RECEIVERS_BANK_ACCOUNTS}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    postReceiverBankAccount: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.GET_RECEIVERS_BANK_ACCOUNTS}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    updateReceiverBankAccount: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.GET_RECEIVERS_BANK_ACCOUNTS}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    deleteReceiverBankAccount: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.GET_RECEIVERS_BANK_ACCOUNTS}`,
        method: 'DELETE',
        body: body,
      }),
      invalidatesTags: TAG,
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
