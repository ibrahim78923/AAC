import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['CONTACTS'];

export const contactsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.CONTACTS,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getContactById: builder.query({
      query: (id: any) => ({
        url: `${END_POINTS?.CONTACTS}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    postContacts: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.CONTACTS,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['CONTACTS', 'CONTACTS_VIEW'],
    }),

    getContactsView: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.CONTACTS_VIEWS,
        method: 'GET',
        params: params,
      }),
      providesTags: ['CONTACTS', 'CONTACTS_VIEW'],
    }),

    postContactsView: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.CONTACTS_VIEW,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    updateContact: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.CONTACTS}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    updateContactOwner: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.ASSIGN_CONTACT_OWNER}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    getLifeCycle: builder.query({
      query: () => ({
        url: `${END_POINTS?.LIFECYCLE_STAGES}?page=1&limit=10`,
        method: 'GET',
      }),
      providesTags: ['lifeCycle'],
    }),

    getUpdatedLifeCycle: builder.query({
      query: () => ({
        url: `${END_POINTS?.LIFECYCLE_STAGES}?page=1&limit=10`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.lifecycleStages;
      },

      providesTags: ['lifeCycle'],
    }),

    getContactsStatus: builder.query({
      query: () => ({
        url: `${END_POINTS?.CONTACT_STATUS}?page=1&limit=10&status=inactive`,
        method: 'GET',
      }),
      providesTags: ['ContactsStatus'],
    }),

    getContactsStatusUpdated: builder.query({
      query: () => ({
        url: `${END_POINTS?.CONTACT_STATUS}?page=1&limit=10&status=inactive`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.conatactStatus;
      },
      providesTags: ['ContactsStatus'],
    }),

    deleteContact: builder.mutation({
      query: ({ contactIds }: any) => ({
        url: `${END_POINTS?.CONTACTS}`,
        method: 'DELETE',
        body: { contactIds },
      }),
      invalidatesTags: TAG,
    }),

    getDeletedContacts: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DELETED_CONTACT_LIST,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    restoreContact: builder.mutation({
      query: ({ contactIds }: any) => ({
        url: `${END_POINTS?.CONTACT_RESTORE}`,
        method: 'PATCH',
        body: { contactIds },
      }),
      invalidatesTags: TAG,
    }),

    deleteContactPermanent: builder.mutation({
      query: ({ contactIds }: any) => ({
        url: `${END_POINTS?.CONTACT_DELETE_PERMANENT}`,
        method: 'DELETE',
        body: { contactIds },
      }),
      invalidatesTags: TAG,
    }),

    // Re-assign
    patchContactTask: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.TASK_MANAGEMENT}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['TASKS'],
    }),

    getContactCustomizeColumns: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.CUSTOMIZE_COLUMNS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    putContactCustomizedColumns: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.CUSTOMIZE_COLUMNS}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['CONTACTS', 'CUSTOMIZE'],
    }),

    getAllUserTeams: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.TEAMS_ALL_USER}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getContactDropdownList: builder?.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.CONTACTS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.contacts;
      },
      providesTags: ['CONTACTS'],
    }),

    getContactsStatusList: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.CONTACT_STATUS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.conatactStatus;
      },
      providesTags: ['CONTACTS_STATUS'],
    }),

    getContactsLifeCycleStages: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.LIFECYCLE_STAGES}`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.lifecycleStages;
      },
      providesTags: ['LIFECYCLE_STAGE'],
    }),

    getContactsOwnerList: builder.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.DROPDOWN_ORGANIZATIONS}/${params?.id}/users`,
        method: 'GET',
        params: {
          meta: params?.meta,
          search: params?.search,
        },
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: ['CONTACT_OWNER'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactByIdQuery,
  usePostContactsMutation,
  useGetContactsViewQuery,
  usePostContactsViewMutation,
  useUpdateContactMutation,
  useUpdateContactOwnerMutation,
  useDeleteContactMutation,
  useGetDeletedContactsQuery,
  useRestoreContactMutation,
  useDeleteContactPermanentMutation,
  usePatchContactTaskMutation,
  useGetLifeCycleQuery,
  useGetAllUserTeamsQuery,
  useGetContactsStatusQuery,
  useGetContactCustomizeColumnsQuery,
  usePutContactCustomizedColumnsMutation,
  useLazyGetUpdatedLifeCycleQuery,
  useLazyGetContactsStatusUpdatedQuery,
  useLazyGetContactDropdownListQuery,
  useLazyGetContactsStatusListQuery,
  useLazyGetContactsLifeCycleStagesQuery,
  useLazyGetContactsOwnerListQuery,
} = contactsAPI;
