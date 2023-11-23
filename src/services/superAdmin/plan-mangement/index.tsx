import { superAdminBillingInvoices } from '@/routesConstants/endpoints';
import { SUPER_ADMIN_PLAN_MANAGEMENT } from '@/routesConstants/paths';
import { baseAPI } from '@/services/base-api';

const TAG = ['PLAN_MANAGEMENT'];
export const planManagementAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPlanMangement: builder.query({
      query: ({ params }: any) => ({
        url: `${SUPER_ADMIN_PLAN_MANAGEMENT?.PLAN_MANAGEMENT}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getPlanTypes: builder.query({
      query: () => ({
        url: `${SUPER_ADMIN_PLAN_MANAGEMENT?.PLAN_TYPE_LIST}`,
        method: 'GET',
      }),
      providesTags: ['PlanTypes'],
    }),
    getProducts: builder.query({
      query: () => ({
        url: superAdminBillingInvoices?.get_Products,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    getProductsFeatures: builder.query({
      query: ({ id }) => ({
        url: `${SUPER_ADMIN_PLAN_MANAGEMENT?.PRODUCT_FEATURES}&productId=${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    getProductsFeaturesAll: builder.query({
      query: () => ({
        url: `${SUPER_ADMIN_PLAN_MANAGEMENT?.PRODUCT_FEATURES}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    getPlanMangementById: builder.query({
      query: ({ id }: any) => ({
        url: `${SUPER_ADMIN_PLAN_MANAGEMENT?.PLAN_MANAGEMENT}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    getPlanTypeList: builder.query({
      query: () => ({
        url: `${SUPER_ADMIN_PLAN_MANAGEMENT?.PLAN_TYPE_LIST}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    postPlanMangement: builder.mutation({
      query: ({ body }: any) => ({
        url: `${SUPER_ADMIN_PLAN_MANAGEMENT?.PLAN_MANAGEMENT}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    updatePlanMangement: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${SUPER_ADMIN_PLAN_MANAGEMENT?.PLAN_MANAGEMENT}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    deletePlanMangement: builder.mutation({
      query: ({ id }: any) => ({
        url: `${SUPER_ADMIN_PLAN_MANAGEMENT?.PLAN_MANAGEMENT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useUpdatePlanMangementMutation,
  usePostPlanMangementMutation,
  useGetPlanMangementQuery,
  useDeletePlanMangementMutation,
  useGetPlanMangementByIdQuery,
  useGetPlanTypeListQuery,
  useGetProductsQuery,
  useGetPlanTypesQuery,
  useGetProductsFeaturesQuery,
  useGetProductsFeaturesAllQuery,
} = planManagementAPI;
