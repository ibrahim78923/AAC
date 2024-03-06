import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const SmsMarketingAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSmsBroadcats: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.GET_SMS_MARKETING_BROADCAST,
        method: 'GET',
        params: params,
      }),
      providesTags: ['BROADCAST'],
    }),

    // getReceiverBankAccountsById: builder.query({
    //   query: (id: any) => ({
    //     url: `${END_POINTS?.GET_RECEIVERS_BANK_ACCOUNTS}/${id}`,
    //     method: 'GET',
    //   }),
    //   providesTags: ['RECEIVER_BANK_ACCOUNT'],
    // }),

    // postReceiverBankAccount: builder.mutation({
    //   query: ({ body }: any) => ({
    //     url: `${END_POINTS?.GET_RECEIVERS_BANK_ACCOUNTS}`,
    //     method: 'POST',
    //     body: body,
    //   }),
    //   invalidatesTags: ['RECEIVER_BANK_ACCOUNT'],
    // }),

    // updateReceiverBankAccount: builder.mutation({
    //   query: ({ id, body }: any) => ({
    //     url: `${END_POINTS?.GET_RECEIVERS_BANK_ACCOUNTS}/${id}`,
    //     method: 'PATCH',
    //     body: body,
    //   }),
    //   invalidatesTags: ['RECEIVER_BANK_ACCOUNT'],
    // }),

    deleteSmsBroadcast: builder.mutation({
      query: ({ ids }: any) => ({
        url: `${END_POINTS?.GET_SMS_MARKETING_BROADCAST}/${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BROADCAST'],
    }),
  }),
});

export const {
  useGetSmsBroadcatsQuery,
  useDeleteSmsBroadcastMutation,
  // useDeleteReceiverBankAccountMutation,
  // usePostReceiverBankAccountMutation,
  // useUpdateReceiverBankAccountMutation,
  // useGetReceiverBankAccountsByIdQuery,
} = SmsMarketingAPI;
