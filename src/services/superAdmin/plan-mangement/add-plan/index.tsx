import { baseAPI } from '@/services/base-api';

export const planManagementAddPlanAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAddPlanById: builder.query({
      query: () => ({
        url: `/plan-management`,
        method: 'GET',
      }),
      providesTags: ['PLAN_MANAGEMENT'],
    }),

    postAddPlan: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `/plan-management/${id}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['PLAN_MANAGEMENT'],
    }),

    updateAddPlan: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `/plan-management/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['PLAN_MANAGEMENT'],
    }),

    deleteAddPlan: builder.mutation({
      query: ({ id }: any) => ({
        url: `/plan-management/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PLAN_MANAGEMENT'],
    }),
  }),
});

export const {
  useGetAddPlanByIdQuery,
  usePostAddPlanMutation,
  useUpdateAddPlanMutation,
  useDeleteAddPlanMutation,
} = planManagementAddPlanAPI;
