import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const { INVENTORY_EXPENSE, GET_INVENTORY_EXPENSE } = END_POINTS;
export const inventoryExpense = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getInventoryExpense: builder.query({
      query: () => ({
        url: `${GET_INVENTORY_EXPENSE}`,
        method: 'GET',
      }),
      providesTags: ['INVENTORY_EXPENSE'],
    }),
    postInventoryExpense: builder.mutation({
      query: (body: any) => ({
        url: `${INVENTORY_EXPENSE}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['INVENTORY_EXPENSE'],
    }),
  }),
});

export const { usePostInventoryExpenseMutation, useGetInventoryExpenseQuery } =
  inventoryExpense;
