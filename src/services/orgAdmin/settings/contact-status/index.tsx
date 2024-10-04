import { ORG_ADMIN } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['SettingContactStatus'];
export const contactStatusAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postContactStatusOrgadmin: builder.mutation({
      query: ({ body }: any) => ({
        url: `${ORG_ADMIN?.SETTINGS_CONTACT_STATUS}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    getContactStatusOrgadmin: builder.query({
      query: (params) => ({
        url: `${ORG_ADMIN?.SETTINGS_CONTACT_STATUS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['SettingLifeCycleStage'],
    }),
    getContactStatusIdOrgadmin: builder.query({
      query: ({ id }) => ({
        url: `${ORG_ADMIN?.SETTINGS_CONTACT_STATUS}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),
    updateContactStatusOrgadmin: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${ORG_ADMIN?.SETTINGS_CONTACT_STATUS}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
    deleteContactStatusOrgadmin: builder.mutation({
      query: ({ id }) => ({
        url: `${ORG_ADMIN?.SETTINGS_CONTACT_STATUS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
  }),
});
export const {
  usePostContactStatusOrgadminMutation,
  useGetContactStatusOrgadminQuery,
  useGetContactStatusIdOrgadminQuery,
  useUpdateContactStatusOrgadminMutation,
  useDeleteContactStatusOrgadminMutation,
  // usePostContactStatusMutation,
  // useGetContactStatusIdQuery,
  // useGetContactStatusQuery,
  // useUpdateContactStatusMutation,
  // useDeleteContactStatusMutation,
} = contactStatusAPI;
