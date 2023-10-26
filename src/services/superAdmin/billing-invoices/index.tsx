import { baseAPI } from '@/services/base-api';

export const bilingInvoicesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPlanMangement: builder.query({
      query: () => ({
        url: `/biling-invoices`,
        method: 'GET',
      }),
      providesTags: ['bilingInvoices'],
    }),

    getPlanMangementById: builder.query({
      query: ({ id }: any) => ({
        url: `/biling-invoices/${id}`,
        method: 'GET',
      }),
      providesTags: ['bilingInvoices'],
    }),

    postPlanMangement: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `/biling-invoices/${id}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['bilingInvoices'],
    }),

    updatePlanMangement: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `/biling-invoices/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['bilingInvoices'],
    }),

    deletePlanMangement: builder.mutation({
      query: ({ id }: any) => ({
        url: `/biling-invoices/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['bilingInvoices'],
    }),
  }),
});

export const {
  useUpdatePlanMangementMutation,
  usePostPlanMangementMutation,
  useGetPlanMangementQuery,
  useDeletePlanMangementMutation,
  useGetPlanMangementByIdQuery,
} = bilingInvoicesAPI;
