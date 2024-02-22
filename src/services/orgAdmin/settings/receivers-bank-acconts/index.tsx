import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const receiversBankAccountsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getReceiverBankAccounts: builder.query({
      query: () => ({
        url: `${END_POINTS?.GET_RECEIVERS_BANK_ACCOUNTS}`,
        method: 'GET',
      }),
      providesTags: ['SettingLifeCycleStage'],
    }),

    // postSettingLifeCycleStage: builder.mutation({
    //   query: ({ body }: any) => ({
    //     url: `${}`,
    //     method: 'POST',
    //     body: body,
    //   }),
    //   invalidatesTags: ['SettingLifeCycleStage'],
    // }),
    // updateSettingLifeCycleStage: builder.mutation({
    //   query: ({ id, body }: any) => ({
    //     url: `${}/${id}`,
    //     method: 'PATCH',
    //     body: body,
    //   }),
    //   invalidatesTags: ['SettingLifeCycleStage'],
    // }),
    // deleteSettingLifeCycleStage: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `${}/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['SettingLifeCycleStage'],
    // }),
  }),
});

export const { useGetReceiverBankAccountsQuery } = receiversBankAccountsAPI;
