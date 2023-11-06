import { baseAPI } from '@/services/base-api';

export const organizationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postOrganization: builder.mutation({
      query: ({ body }: any) => ({
        url: `/org-company-account`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Organization'],
    }),
    getOrganization: builder.query({
      query: ({ organizationId, pages = 1, limit = 10 }: any) => ({
        url: `/org-company-account/get-accounts/${organizationId}?page=${pages}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['Organization'],
    }),
    getOrganizationById: builder.query({
      query: ({ id }: any) => ({
        url: `/org-company-account/${id}`,
        method: 'GET',
      }),
      providesTags: ['Organization'],
    }),
    getOrganizationMainId: builder.query({
      query: ({ id }: any) => ({
        url: `/organization/${id}`,
        method: 'GET',
      }),
      providesTags: ['Organization'],
    }),
    updateOrganization: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `/organization/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Organization'],
    }),
    deleteOrganization: builder.mutation({
      query: ({ id }: any) => ({
        url: `/organization/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Organization'],
    }),
  }),
});

export const {
  useUpdateOrganizationMutation,
  usePostOrganizationMutation,
  useGetOrganizationQuery,
  useDeleteOrganizationMutation,
  useGetOrganizationByIdQuery,
  useGetOrganizationMainIdQuery,
} = organizationAPI;
