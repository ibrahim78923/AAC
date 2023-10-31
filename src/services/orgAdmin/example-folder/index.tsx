import { baseAPI } from '@/services/base-api';

export const exampleExampleAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPlanMangement: builder.query({
      query: () => ({
        url: `/plan-management`,
        method: 'GET',
      }),
      providesTags: ['PLAN_MANEGEMENT'],
    }),
    getPlanMangementById: builder.query({
      query: ({ id }: any) => ({
        url: `/plan-management/${id}`,
        method: 'GET',
      }),
      providesTags: ['PLAN_MANEGEMENT'],
    }),
    postPlanMangement: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `/plan-management/${id}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['PLAN_MANEGEMENT'],
    }),
    updatePlanMangement: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `/plan-management/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['PLAN_MANEGEMENT'],
    }),
    deletePlanMangement: builder.mutation({
      query: ({ id }: any) => ({
        url: `/plan-management/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PLAN_MANEGEMENT'],
    }),
  }),
});

export const {
  useUpdatePlanMangementMutation,
  usePostPlanMangementMutation,
  useGetPlanMangementQuery,
  useDeletePlanMangementMutation,
  useGetPlanMangementByIdQuery,
} = exampleExampleAPI;
