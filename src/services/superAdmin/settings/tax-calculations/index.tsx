import { baseAPI } from '@/services/base-api';
import { SUPER_ADMIN_SETTINGS } from '@/routesConstants/paths';

const TAG = ['SETTINGS_TAX_CALCULATIONS'];
export const settingsTaxCalculationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTaxCalculation: builder.query({
      query: (params) => ({
        url: SUPER_ADMIN_SETTINGS.TAX_CALCULATION,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getTaxCalculationById: builder.query({
      query: (id: any) => ({
        url: `${SUPER_ADMIN_SETTINGS.TAX_CALCULATION}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    postTaxCalculation: builder.mutation({
      query: ({ body }: any) => ({
        url: SUPER_ADMIN_SETTINGS.TAX_CALCULATION,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    updateTaxCalculation: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${SUPER_ADMIN_SETTINGS.TAX_CALCULATION}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    deleteTaxCalculation: builder.mutation({
      query: (id: any) => ({
        url: `${SUPER_ADMIN_SETTINGS.TAX_CALCULATION}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetTaxCalculationQuery,
  useGetTaxCalculationByIdQuery,
  useUpdateTaxCalculationMutation,
  usePostTaxCalculationMutation,
  useDeleteTaxCalculationMutation,
} = settingsTaxCalculationAPI;
