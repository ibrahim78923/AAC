import { settingContactStatus } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const contactStatusAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postContactStatus: builder.mutation({
      query: ({ body }: any) => ({
        url: `${settingContactStatus.POST_CONTACT_STATUS}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['SettingContactStatus'],
    }),
    getContactStatus: builder.query({
      query: () => ({
        url: `${settingContactStatus.GET_CONTACT_STATUS}`,
        method: 'GET',
      }),
      providesTags: ['SettingLifeCycleStage'],
    }),
    getContactStatusId: builder.query({
      query: ({ id }) => ({
        url: `${settingContactStatus.GET_CONTACT_STATUS_ID}/${id}`,
        method: 'GET',
      }),
      providesTags: ['SettingContactStatus'],
    }),
    updateContactStatus: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${settingContactStatus.UPDATE_CONTACT_STATUS}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['SettingContactStatus'],
    }),
    deleteContactStatus: builder.mutation({
      query: ({ id }) => ({
        url: `${settingContactStatus.DELETE_CONTACT_STATUS}/${id}`,
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
