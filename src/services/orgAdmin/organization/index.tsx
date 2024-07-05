import { END_POINTS, organization } from '@/routesConstants/endpoints';
import { TAGS, baseAPI } from '@/services/base-api';

export const organizationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postOrganization: builder.mutation({
      query: ({ body }: any) => ({
        url: `${organization.POST_ORGANIZATION_ACCOUNT}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAGS,
    }),
    getOrganization: builder.query({
      query: ({ organizationId, pages, limit, search = '' }: any) => ({
        url: `${organization?.GET_ORGANIZATION_ACCOUNT_ALL}/${organizationId}?page=${pages}&limit=${limit}&search=${search}`,
        method: 'GET',
      }),
      providesTags: TAGS,
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: `${organization?.GET_PRODUCTS_ALL}?status=active`,
        method: 'GET',
      }),
      providesTags: TAGS,
    }),
    getOrganizationById: builder.query({
      query: ({ id }: any) => ({
        url: `${organization.GET_ORGANIZATION_ACCOUNT_ID}/${id}`,
        method: 'GET',
      }),
      providesTags: TAGS,
    }),
    getOrganizationDetailsById: builder.query({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.ORGANIZATION}/${id}`,
        method: 'GET',
      }),
      providesTags: TAGS,
    }),
    getOrganizationMainId: builder.query({
      query: ({ id }: any) => ({
        url: `${organization.GET_MAIN_ORGANIZATION}/${id}`,
        method: 'GET',
      }),
      providesTags: TAGS,
    }),
    getOrganizationProducts: builder.query({
      query: () => ({
        url: `${organization?.USERS_PRODUCTS}`,
        method: 'GET',
      }),
      providesTags: TAGS,
    }),
    updateOrganization: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${organization.UPDATE_ORGANIZATION_ACCOUNT}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAGS,
    }),
    updateOrganizationStatus: builder.mutation({
      query: ({ id, isActive }: any) => ({
        url: `${organization.UPDATE_ORGANIZATION_ACCOUNT_STATUS}?id=${id}&isActive=${isActive}`,
        method: 'PATCH',
      }),
      invalidatesTags: TAGS,
    }),
    deleteOrganization: builder.mutation({
      query: ({ body }) => ({
        url: `${organization.DELETE_ORGANIZARION_MULTIPLE}`,
        method: 'DELETE',
        body: body,
      }),
      invalidatesTags: ['Organization'],
    }),
    updateOrganizationById: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${organization.GET_MAIN_ORGANIZATION}/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: TAGS,
    }),
  }),
});

export const {
  useUpdateOrganizationMutation,
  useUpdateOrganizationByIdMutation,
  usePostOrganizationMutation,
  useGetOrganizationQuery,
  useDeleteOrganizationMutation,
  useGetOrganizationByIdQuery,
  useGetOrganizationMainIdQuery,
  useLazyGetOrganizationDetailsByIdQuery,
  useUpdateOrganizationStatusMutation,
  useGetAllProductsQuery,
  useGetOrganizationDetailsByIdQuery,
  useGetOrganizationProductsQuery,
} = organizationAPI;
