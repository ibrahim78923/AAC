import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const SmsMarketingTemplateAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSmsTemplates: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.GET_SMS_TEMPLATES,
        method: 'GET',
        params: params,
      }),
      providesTags: ['TEMPLATE'],
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

    deleteSmsTemplate: builder.mutation({
      query: ({ ids }: any) => ({
        url: `${END_POINTS?.GET_SMS_TEMPLATES}/${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TEMPLATE'],
    }),
  }),
});

export const { useGetSmsTemplatesQuery, useDeleteSmsTemplateMutation } =
  SmsMarketingTemplateAPI;
