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

    getContactAssociations: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.CONTACT_ASSOCIATIONS,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getLifeCycle: builder.query({
      query: () => ({
        url: `${END_POINTS?.LIFECYCLE_STAGES}?page=1&limit=10`,
        method: 'GET',
      }),
      providesTags: ['lifeCycle'],
    }),

    getContactsStatus: builder.query({
      query: () => ({
        url: `${END_POINTS?.CONTACT_STATUS}?page=1&limit=10&status=inactive`,
        method: 'GET',
      }),
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

    getContactTasks: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.CONTACT_TASKS,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    updateContactTask: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.TASK}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetContactsStatusQuery,
  useGetContactsQuery,
  useGetContactByIdQuery,
  useGetContactAssociationsQuery,
  useGetLifeCycleQuery,
  usePostContactsMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
  useGetDeletedContactsQuery,
  useRestoreContactMutation,
  useDeleteContactPermanentMutation,
  useGetContactTasksQuery,
  useUpdateContactTaskMutation,
} = contactsAPI;
