import { baseAPI } from '@/services/base-api';

export const planManagementPlanFeaturesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPlanMangement: builder.query({
      query: () => ({
        url: `/plan-management`,
        method: 'GET',
      }),
      providesTags: ['PLAN_MANAGEMENT'],
    }),

    getPlanMangementById: builder.query({
      query: ({ id }: any) => ({
        url: `/plan-management/${id}`,
        method: 'GET',
      }),
      providesTags: ['PLAN_MANAGEMENT'],
    }),

    postPlanMangement: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `/plan-management/${id}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['PLAN_MANAGEMENT'],
    }),

    updatePlanMangement: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `/plan-management/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['PLAN_MANAGEMENT'],
    }),

    deletePlanMangement: builder.mutation({
      query: ({ id }: any) => ({
        url: `/plan-management/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PLAN_MANAGEMENT'],
    }),
  }),
});

export const {
  useUpdatePlanMangementMutation,
  usePostPlanMangementMutation,
  useGetPlanMangementQuery,
  useDeletePlanMangementMutation,
  useGetPlanMangementByIdQuery,
} = planManagementPlanFeaturesAPI;
