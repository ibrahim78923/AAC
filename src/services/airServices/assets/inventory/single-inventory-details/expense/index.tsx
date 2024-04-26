import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const {
  INVENTORY_EXPENSE,
  GET_INVENTORY_EXPENSE,
  PATCH_INVENTORY_EXPENSE,
  DELETE_INVENTORY_EXPENSE,
} = END_POINTS;
const TAG = 'INVENTORY_EXPENSE';
export const inventoryExpense = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getInventoryExpense: builder.query({
      query: (params: any) => ({
        url: `${GET_INVENTORY_EXPENSE}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    postInventoryExpense: builder.mutation({
      query: (body: any) => ({
        url: `${INVENTORY_EXPENSE}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    patchInventoryExpense: builder.mutation({
      query: (body: any) => ({
        url: `${PATCH_INVENTORY_EXPENSE}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteInventoryExpense: builder.mutation({
      query: (params: any) => {
        const deleteId = params?.ids.join('&ids=');
        return {
          url: `${DELETE_INVENTORY_EXPENSE}/{ids}?ids=${deleteId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  usePostInventoryExpenseMutation,
  useGetInventoryExpenseQuery,
  usePatchInventoryExpenseMutation,
  useDeleteInventoryExpenseMutation,
} = inventoryExpense;
