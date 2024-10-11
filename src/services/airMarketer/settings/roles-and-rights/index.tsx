import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['PERMISSIONS'];
export const airMarketerRolesAndRightsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getMarketerPermissionsRoles: builder.query({
      query: (values: any) => ({
        url: END_POINTS?.GET_PERMISSIONS_ROLES,
        method: 'GET',
        params: values,
      }),
      providesTags: TAG,
    }),

    getMarketerPermissionsRolesById: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.GET_PLAN_PRODUCTS_PERMISSIONS}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    getMarketerRolesDataById: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.GET_PERMISSIONS_ROLES}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    getMarketerProductsPermissionsList: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_PRODUCTS_PERMISSIONS}/${params?.productId}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: TAG,
    }),

    getMarketerProductsPermissions: builder.query({
      query: ({ productId }: any) => ({
        url: `${END_POINTS?.GET_PRODUCTS_PERMISSIONS}/${productId}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    updateMarketerRoleRights: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${END_POINTS?.GET_PERMISSIONS_ROLES}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),

    postMarketerPermissionRole: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.GET_PERMISSIONS_ROLES,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetMarketerPermissionsRolesQuery,
  useGetMarketerProductsPermissionsQuery,
  useLazyGetMarketerProductsPermissionsListQuery,
  useUpdateMarketerRoleRightsMutation,
  useLazyGetMarketerPermissionsRolesByIdQuery,
  usePostMarketerPermissionRoleMutation,
  useGetMarketerRolesDataByIdQuery,
} = airMarketerRolesAndRightsAPI;
