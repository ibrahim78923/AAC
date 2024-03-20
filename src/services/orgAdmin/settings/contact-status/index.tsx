import { ORG_ADMIN } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const contactStatusAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postContactStatus: builder.mutation({
      query: ({ body }: any) => ({
        url: `${ORG_ADMIN?.SETTINGS_CONTACT_STATUS}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['SettingContactStatus'],
    }),
    getContactStatus: builder.query({
      query: (params) => ({
        url: `${ORG_ADMIN?.SETTINGS_CONTACT_STATUS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['SettingLifeCycleStage'],
    }),
    getContactStatusId: builder.query({
      query: ({ id }) => ({
        url: `${ORG_ADMIN?.SETTINGS_CONTACT_STATUS}/${id}`,
        method: 'GET',
      }),
      providesTags: ['SettingContactStatus'],
    }),
    updateContactStatus: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${ORG_ADMIN?.SETTINGS_CONTACT_STATUS}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['SettingContactStatus'],
    }),
    deleteContactStatus: builder.mutation({
      query: ({ id }) => ({
        url: `${ORG_ADMIN?.SETTINGS_CONTACT_STATUS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SettingContactStatus'],
    }),
  }),
});
export const {
  usePostContactStatusMutation,
  useGetContactStatusIdQuery,
  useGetContactStatusQuery,
  useUpdateContactStatusMutation,
  useDeleteContactStatusMutation,
} = contactStatusAPI;
