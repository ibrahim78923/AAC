import { baseAPI } from '@/services/base-api';
const TAG = 'Expense';
export const detailsExpenseInfoAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    postExpenseInfoData: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: 'expense/add-expense',
        method: 'POST',
        params: apiDataParameter?.queryParams,
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { usePostExpenseInfoDataMutation } = detailsExpenseInfoAPI;
