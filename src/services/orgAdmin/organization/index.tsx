import { organization } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const organizationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postOrganization: builder.mutation({
      query: ({ body }: any) => ({
        url: `${organization.POST_ORGANIZATION_ACCOUNT}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Organization'],
    }),
    getOrganization: builder.query({
      query: ({ organizationId, pages = 1, limit = 10, search = '' }: any) => ({
        url: `${organization.GET_ORGANIZATION_ACCOUNT_ALL}/${organizationId}?page=${pages}&limit=${limit}&search=${search}`,
        method: 'GET',
      }),
      providesTags: ['Organization'],
    }),
    getOrganizationById: builder.query({
      query: ({ id }: any) => ({
        url: `${organization.GET_ORGANIZATION_ACCOUNT_ID}/${id}`,
        method: 'GET',
      }),
      providesTags: ['Organization'],
    }),
    getOrganizationMainId: builder.query({
      query: ({ id }: any) => ({
        url: `${organization.GET_MAIN_ORGANIZATION}/${id}`,
        method: 'GET',
      }),
      providesTags: ['Organization'],
    }),
    updateOrganization: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${organization.UPDATE_ORGANIZATION_ACCOUNT}/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Organization'],
    }),
    deleteOrganization: builder.mutation({
      query: ({ body }) => ({
        url: `${organization.DELETE_ORGANIZARION_MULTIPLE}`,
        method: 'DELETE',
        body: body,
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
